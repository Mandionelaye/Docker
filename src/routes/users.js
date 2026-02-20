const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');

// Routes d'authentification (publiques)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Routes de profil (nécessitent une authentification)
router.get('/profile', requireAuth, userController.getProfile);
router.put('/profile', requireAuth, userController.updateProfile);

// Route de profil public (accessible sans authentification)
router.get('/profile/:userId', userController.getPublicProfile);

// Routes de récupération de mot de passe (publiques)
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Routes de vérification d'email (publiques)
router.post('/verify-email', userController.verifyEmail);
router.post('/resend-verification-email', userController.resendVerificationEmail);

module.exports = router;