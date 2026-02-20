const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importer les routes
const healthRoutes = require('./routes/health');
const userRoutes = require('./routes/users');

// Utiliser les routes
app.use('/health', healthRoutes);
app.use('/api/users', userRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur Node Docker App',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    features: [
      'Health Check',
      'User Authentication (CRUD)',
      'Email/Password Login',
      'Profile Management',
      'Password Reset',
      'Email Verification'
    ],
    endpoints: {
      health: '/health',
      users: '/api/users',
      documentation: 'Voir README.md pour plus de détails'
    }
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.originalUrl
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 Environnement: ${process.env.NODE_ENV || 'development'}`);
});