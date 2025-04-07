// Script Express simple pour tester les routes d'authentification
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = 3030;

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
  const { email, password, lastName } = req.body;
  
  if (!email || !password || !lastName) {
    return res.status(400).json({ message: 'Email, mot de passe, nom requissss' });
  }
  
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ message: 'Un utilisateur avec cet email existe déjà' });
  }
  
  const newUserId = (users.length + 1).toString();
  users.push({ id: newUserId, email, password, lastName });
  
  const tokens = generateTokens(newUserId);
  
  res.status(201).json({
    message: 'Inscription réussie',
    ...tokens,
    userId: newUserId
  });
});

app.post('/auth/verify', extractToken, (req, res) => {
  const isValid = verifyToken(req.token);
  if (!isValid) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
  res.json({ valid: true });
});

app.post('/auth/refresh', (req, res) => {
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
  revokedTokens.add(req.token);
  res.json({ message: 'Token révoqué avec succès' });
});

// Démarrage du serveur
app.listen(PORT, () => {
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