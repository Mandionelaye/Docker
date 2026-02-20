const insforge = require('../insforge/client');

const userController = {
  // Inscription d'un nouvel utilisateur
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Email et mot de passe requis'
        });
      }

      const { data, error } = await insforge.auth.signUp({
        email,
        password,
        name: name || undefined
      });

      if (error) {
        return res.status(400).json({
          error: error.message || 'Erreur lors de l\'inscription'
        });
      }

      res.status(201).json({
        message: data.requireEmailVerification 
          ? 'Un email de vérification a été envoyé'
          : 'Inscription réussie',
        user: data.user,
        requireEmailVerification: data.requireEmailVerification
      });
    } catch (error) {
      console.error('Erreur inscription:', error);
      res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  },

  // Connexion d'un utilisateur
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Email et mot de passe requis'
        });
      }

      const { data, error } = await insforge.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return res.status(401).json({
          error: error.message || 'Identifiants invalides'
        });
      }

      res.json({
        message: 'Connexion réussie',
        user: data.user,
        accessToken: data.accessToken,
        redirectTo: data.redirectTo
      });
    } catch (error) {
      console.error('Erreur connexion:', error);
      res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  },

  // Déconnexion d'un utilisateur
  logout: async (req, res) => {
    try {
      const { error } = await insforge.auth.signOut();

      if (error) {
        return res.status(400).json({
          error: error.message || 'Erreur lors de la déconnexion'
        });
      }

      res.json({
        message: 'Déconnexion réussie'
      });
    } catch (error) {
      console.error('Erreur déconnexion:', error);
      res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  },

  // Récupérer le profil de l'utilisateur connecté
  getProfile: async (req, res) => {
    try {
      const { data, error } = await insforge.auth.getCurrentSession();

      if (error || !data.session) {
        return res.status(401).json({
          error: 'Non authentifié'
        });
      }

      res.json({
        user: data.session.user
      });
    } catch (error) {
      console.error('Erreur profil:', error);
      res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  },

  // Mettre à jour le profil de l'utilisateur
  updateProfile: async (req, res) => {
    try {
      const { name, avatar_url, ...customFields } = req.body;

      // Vérifier que l'utilisateur est authentifié
      const { data: sessionData, error: sessionError } = await insforge.auth.getCurrentSession();
      
      if (sessionError || !sessionData.session) {
        return res.status(401).json({
          error: 'Non authentifié'
        });
      }

      // Préparer les données du profil
      const profileData = {
        ...(name && { name }),
        ...(avatar_url && { avatar_url }),
        ...customFields
      };

      const { data, error } = await insforge.auth.setProfile(profileData);

      if (error) {
        return res.status(400).json({
          error: error.message || 'Erreur lors de la mise à jour du profil'
        });
      }

      res.json({
        message: 'Profil mis à jour avec succès',
        profile: data
      });
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  },

  // Récupérer le profil public d'un utilisateur
  getPublicProfile: async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          error: 'ID utilisateur requis'
        });
      }

      const { data, error } = await insforge.auth.getProfile(userId);

      if (error) {
        return res.status(404).json({
          error: 'Utilisateur non trouvé'
        });
      }

      res.json({
        profile: data
      });
    } catch (error) {
      console.error('Erreur profil public:', error);
      res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  },

  // Envoyer un email de réinitialisation de mot de passe
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          error: 'Email requis'
        });
      }

      const { data, error } = await insforge.auth.sendResetPasswordEmail({
        email
      });

      if (error) {
        return res.status(400).json({
          error: error.message || 'Erreur lors de l\'envoi de l\'email'
        });
      }

      res.json({
        message: 'Email de réinitialisation envoyé',
        success: data.success
      });
    } catch (error) {
      console.error('Erreur mot de passe oublié:', error);
      res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  },

  // Réinitialiser le mot de passe avec un token
  resetPassword: async (req, res) => {
    try {
      const { newPassword, otp } = req.body;

      if (!newPassword || !otp) {
        return res.status(400).json({
          error: 'Nouveau mot de passe et token requis'
        });
      }

      const { data, error } = await insforge.auth.resetPassword({
        newPassword,
        otp
      });

      if (error) {
        return res.status(400).json({
          error: error.message || 'Erreur lors de la réinitialisation'
        });
      }

      res.json({
        message: 'Mot de passe réinitialisé avec succès',
        redirectTo: data.redirectTo
      });
    } catch (error) {
      console.error('Erreur réinitialisation mot de passe:', error);
      res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  },

  // Vérifier l'email avec un code OTP
  verifyEmail: async (req, res) => {
    try {
      const { email, otp } = req.body;

      if (!otp) {
        return res.status(400).json({
          error: 'Code de vérification requis'
        });
      }

      const { data, error } = await insforge.auth.verifyEmail({
        email,
        otp
      });

      if (error) {
        return res.status(400).json({
          error: error.message || 'Code de vérification invalide'
        });
      }

      res.json({
        message: 'Email vérifié avec succès',
        accessToken: data.accessToken,
        user: data.user,
        redirectTo: data.redirectTo
      });
    } catch (error) {
      console.error('Erreur vérification email:', error);
      res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  },

  // Renvoyer l'email de vérification
  resendVerificationEmail: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          error: 'Email requis'
        });
      }

      const { data, error } = await insforge.auth.resendVerificationEmail({
        email
      });

      if (error) {
        return res.status(400).json({
          error: error.message || 'Erreur lors de l\'envoi de l\'email'
        });
      }

      res.json({
        message: 'Email de vérification renvoyé',
        success: data.success
      });
    } catch (error) {
      console.error('Erreur renvoi email vérification:', error);
      res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  }
};

module.exports = userController;