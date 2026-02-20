const insforge = require('../insforge/client');

// Middleware pour vérifier si l'utilisateur est authentifié
const requireAuth = async (req, res, next) => {
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Token d\'authentification manquant ou invalide'
      });
    }

    const token = authHeader.substring(7); // Enlever 'Bearer '

    // Vérifier la session actuelle
    const { data, error } = await insforge.auth.getCurrentSession();

    if (error || !data.session) {
      return res.status(401).json({
        error: 'Non authentifié ou session expirée'
      });
    }

    // Ajouter les données de l'utilisateur à la requête
    req.user = data.session.user;
    req.accessToken = data.session.accessToken;

    next();
  } catch (error) {
    console.error('Erreur middleware auth:', error);
    res.status(401).json({
      error: 'Erreur d\'authentification'
    });
  }
};

// Middleware optionnel pour récupérer l'utilisateur s'il est connecté
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const { data, error } = await insforge.auth.getCurrentSession();
      
      if (!error && data.session) {
        req.user = data.session.user;
        req.accessToken = data.session.accessToken;
      }
    }

    next();
  } catch (error) {
    // Ne pas bloquer si l'authentification échoue
    next();
  }
};

module.exports = {
  requireAuth,
  optionalAuth
};