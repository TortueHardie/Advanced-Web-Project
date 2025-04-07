// Script Express simple pour tester les routes d'authentification
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = 3050;

// Configuration
const JWT_SECRET = 'test-secret-key';
const JWT_REFRESH_SECRET = 'test-refresh-secret-key';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '1d';

// Middleware
app.use(express.json());
app.use(cors());

// Stockage temporaire des tokens révoqués
const revokedTokens = new Set();
// Stockage temporaire des utilisateurs (pour les tests)
const users = [
  { id: '1', email: 'test@example.com', password: 'password123', name: 'Test User' }
];

// Routes
app.get('/health', (req, res) => {
  console.log('Route /health appelée');
  res.json({ status: 'ok', service: 'mock-auth-service' });
});

// Middleware pour extraire le token
const extractToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }
  req.token = token;
  next();
};

// Fonctions pour les tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
  return { accessToken, refreshToken };
};

const verifyToken = (token) => {
  if (revokedTokens.has(token)) {
    return false;
  }
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

// Routes d'authentification
app.post('/auth/login', (req, res) => {
  console.log('Route /auth/login appelée');
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }
  
  const tokens = generateTokens(user.id);
  
  res.json({
    message: 'Connexion réussie',
    ...tokens,
    userId: user.id
  });
});

app.post('/auth/register', (req, res) => {
  console.log('Route /auth/register appelée');
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Email, mot de passe et nom requis' });
  }
  
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ message: 'Un utilisateur avec cet email existe déjà' });
  }
  
  const newUserId = (users.length + 1).toString();
  users.push({ id: newUserId, email, password, name });
  
  const tokens = generateTokens(newUserId);
  
  res.status(201).json({
    message: 'Inscription réussie',
    ...tokens,
    userId: newUserId
  });
});

app.post('/auth/verify', extractToken, (req, res) => {
  console.log('Route /auth/verify appelée');
  const isValid = verifyToken(req.token);
  if (!isValid) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
  res.json({ valid: true });
});

app.post('/auth/refresh', (req, res) => {
  console.log('Route /auth/refresh appelée');
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token manquant' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const tokens = generateTokens(decoded.userId);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ message: 'Refresh token invalide' });
  }
});

app.post('/auth/revoke', extractToken, (req, res) => {
  console.log('Route /auth/revoke appelée');
  revokedTokens.add(req.token);
  res.json({ message: 'Token révoqué avec succès' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur:', err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur', message: err.message });
});

// Démarrage du serveur
try {
  const server = app.listen(PORT, () => {
    console.log(`Service d'authentification mock démarré sur le port ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log('Routes disponibles:');
    console.log('- GET /health');
    console.log('- POST /auth/login');
    console.log('- POST /auth/register');
    console.log('- POST /auth/verify');
    console.log('- POST /auth/refresh');
    console.log('- POST /auth/revoke');
  });

  server.on('error', (err) => {
    console.error('Erreur lors du démarrage du serveur:', err);
    if (err.code === 'EADDRINUSE') {
      console.error(`Le port ${PORT} est déjà utilisé. Essayez un autre port.`);
    }
  });
} catch (error) {
  console.error('Erreur fatale lors du démarrage du serveur:', error);
} 