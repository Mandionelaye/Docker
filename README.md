# Node.js Docker Application

Application Node.js simple et fonctionnelle conteneurisée avec Docker, conçue pour servir de projet de test pour un agent IA.

## 🚀 Caractéristiques

- Backend Node.js avec Express
- Architecture MVC propre
- Conteneurisation Docker complète
- Auto-reload en mode développement
- Variables d'environnement configurables
- Route health check incluse

## 📋 Prérequis

- Node.js 18+ (LTS recommandé)
- Docker et Docker Compose
- npm ou yarn

## 🔧 Installation

### Installation locale

```bash
# Cloner le projet
git clone <url-du-repo>
cd node-docker-app

# Installer les dépendances
npm install

# Copier l'exemple de configuration
cp .env.example .env

# Lancer en mode développement
npm run dev
```

### Installation avec Docker

```bash
# Construire et lancer en mode production
docker-compose up app

# Lancer en mode développement (avec auto-reload)
docker-compose --profile dev up app-dev
```

## 📖 Utilisation

### Scripts npm

- `npm start` - Lance l'application en mode production
- `npm run dev` - Lance l'application avec nodemon (auto-reload)

### Commandes Docker

```bash
# Mode production
docker-compose up app

# Mode développement
docker-compose --profile dev up app-dev

# Construire les images sans lancer
docker-compose build

# Arrêter les conteneurs
docker-compose down
```

## 🔍 API Documentation

### Routes disponibles

#### GET /
Route de base qui retourne les informations de l'application.

**Réponse:**
```json
{
  "message": "Bienvenue sur Node Docker App",
  "version": "1.0.0",
  "environment": "development"
}
```

#### GET /health
Route de health check pour vérifier l'état de l'application.

**Réponse:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-30T12:00:00.000Z",
  "uptime": 42.123,
  "environment": "development"
}
```

### Exemples de requêtes

#### Tester la route health

```bash
# En local
curl http://localhost:3000/health

# Avec Docker
curl http://localhost:3000/health
```

#### Tester la route principale

```bash
curl http://localhost:3000/
```

## 🏗️ Architecture du projet

```
node-docker-app/
├── src/
│   ├── controllers/
│   │   └── healthController.js    # Logique métier pour health
│   ├── routes/
│   │   └── health.js              # Routes health
│   └── server.js                  # Point d'entrée principal
├── Dockerfile                       # Image Docker production
├── Dockerfile.dev                   # Image Docker développement
├── docker-compose.yml             # Configuration Docker Compose
├── .dockerignore                    # Fichiers à ignorer pour Docker
├── .env.example                     # Exemple de configuration
├── package.json                     # Dépendances et scripts
└── README.md                      # Documentation
```

## 🔧 Configuration

Les variables d'environnement peuvent être configurées dans le fichier `.env`:

```env
# Configuration du serveur
PORT=3000
NODE_ENV=development

# Configuration de l'application
APP_NAME=Node Docker App
APP_VERSION=1.0.0
```

## 🐳 Docker

### Dockerfile (Production)
- Multi-stage build pour optimiser la taille de l'image
- Utilisation de l'image Alpine Linux pour la légèreté
- Utilisateur non-root pour la sécurité
- Installation uniquement des dépendances de production

### Dockerfile.dev (Développement)
- Installation de nodemon pour l'auto-reload
- Montage de volumes pour le développement en temps réel
- Installation de toutes les dépendances (incluant dev)

### docker-compose.yml
- Deux services configurés:
  - `app`: Mode production avec restart automatique
  - `app-dev`: Mode développement avec volumes et auto-reload

## 🧪 Tests

Pour tester l'application:

```bash
# Test de la route health
curl -X GET http://localhost:3000/health

# Test de la route principale
curl -X GET http://localhost:3000/
```

## 📝 Notes

- L'application écoute sur le port 3000 par défaut
- En mode développement, nodemon surveille les changements dans le dossier `src/`
- Les logs sont affichés dans la console
- En production, l'application utilise l'utilisateur `nodejs` pour des raisons de sécurité

## 🤝 Contribution

Ce projet est conçu pour être simple et extensible. N'hésitez pas à:
- Ajouter de nouvelles routes
- Implémenter des middlewares
- Ajouter des tests unitaires
- Améliorer la configuration Docker