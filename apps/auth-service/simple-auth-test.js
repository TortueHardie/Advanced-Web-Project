#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config();

// Configuration des URLs
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3005';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';

// Données de test existantes (utilisez un utilisateur qui existe déjà dans la base de données)
const existingUser = {
  email: 'test@example.com',
  password: 'Password123!'
};

// Fonction pour formater les résultats
const formatResult = (route, method, status, success) => {
  const statusColor = success ? '\x1b[32m' : '\x1b[31m'; // Vert pour succès, rouge pour échec
  console.log(`${statusColor}${method} ${route}: ${status} - ${success ? 'OK' : 'ÉCHEC'}\x1b[0m`);
};

// Fonction principale asynchrone
async function testAuthRoutes() {
  console.log('\n=== TEST DES ROUTES D\'AUTHENTIFICATION ===\n');
  console.log('Étape 1: Obtention d\'un token JWT via login');
  
  try {
    // Test de la route de login
    const loginResponse = await axios.post(`${AUTH_SERVICE_URL}/auth/login`, existingUser);
    formatResult('/auth/login', 'POST', loginResponse.status, true);
    
    if (loginResponse.status === 200 && loginResponse.data.accessToken) {
      console.log(`\x1b[32mToken JWT obtenu avec succès\x1b[0m`);
      const { accessToken, refreshToken } = loginResponse.data;
      
      // Test de la route de vérification du token
      console.log('\nÉtape 2: Vérification du token JWT');
      try {
        const verifyResponse = await axios.post(
          `${AUTH_SERVICE_URL}/auth/verify`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        formatResult('/auth/verify', 'POST', verifyResponse.status, true);
        console.log('Détails:', verifyResponse.data);
      } catch (error) {
        formatResult('/auth/verify', 'POST', error.response?.status || 500, false);
        console.error('Erreur lors de la vérification du token:', error.response?.data || error.message);
      }
      
      // Test de la route de rafraîchissement du token
      console.log('\nÉtape 3: Rafraîchissement du token');
      try {
        const refreshResponse = await axios.post(`${AUTH_SERVICE_URL}/auth/refresh`, { refreshToken });
        formatResult('/auth/refresh', 'POST', refreshResponse.status, true);
        console.log('Nouveaux tokens obtenus');
        
        // Mise à jour du token pour les tests suivants
        const newAccessToken = refreshResponse.data.accessToken;
        
        // Test de la route de révocation du token
        console.log('\nÉtape 4: Révocation du token');
        try {
          const revokeResponse = await axios.post(
            `${AUTH_SERVICE_URL}/auth/revoke`,
            {},
            { headers: { Authorization: `Bearer ${newAccessToken}` } }
          );
          formatResult('/auth/revoke', 'POST', revokeResponse.status, true);
          console.log('Token révoqué avec succès');
          
          // Vérification que le token révoqué ne fonctionne plus
          console.log('\nÉtape 5: Vérification que le token révoqué ne fonctionne plus');
          try {
            await axios.post(
              `${AUTH_SERVICE_URL}/auth/verify`,
              {},
              { headers: { Authorization: `Bearer ${newAccessToken}` } }
            );
            formatResult('/auth/verify (avec token révoqué)', 'POST', 200, false);
            console.log('\x1b[31mErreur: Le token révoqué a été accepté (ne devrait pas arriver)\x1b[0m');
          } catch (error) {
            if (error.response?.status === 401) {
              formatResult('/auth/verify (avec token révoqué)', 'POST', error.response.status, true);
              console.log('\x1b[32mLe token révoqué a bien été rejeté\x1b[0m');
            } else {
              formatResult('/auth/verify (avec token révoqué)', 'POST', error.response?.status || 500, false);
              console.error('Erreur inattendue:', error.response?.data || error.message);
            }
          }
        } catch (error) {
          formatResult('/auth/revoke', 'POST', error.response?.status || 500, false);
          console.error('Erreur lors de la révocation du token:', error.response?.data || error.message);
        }
      } catch (error) {
        formatResult('/auth/refresh', 'POST', error.response?.status || 500, false);
        console.error('Erreur lors du rafraîchissement du token:', error.response?.data || error.message);
      }
      
    } else {
      console.log('\x1b[31mÉchec: La réponse ne contient pas de token JWT valide\x1b[0m');
    }
  } catch (error) {
    formatResult('/auth/login', 'POST', error.response?.status || 500, false);
    console.error('Erreur lors de la connexion:', error.response?.data || error.message);
    
    // Si l'erreur est 401 (non autorisé), l'utilisateur n'existe probablement pas, essayons de l'inscrire
    if (error.response?.status === 401) {
      console.log('\nTentative d\'inscription d\'un nouvel utilisateur...');
      try {
        const registerResponse = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, {
          ...existingUser,
          name: 'Test User'
        });
        
        formatResult('/auth/register', 'POST', registerResponse.status, true);
        console.log('Inscription réussie. Veuillez relancer le test.');
      } catch (registerError) {
        formatResult('/auth/register', 'POST', registerError.response?.status || 500, false);
        console.error('Erreur lors de l\'inscription:', registerError.response?.data || registerError.message);
      }
    }
  }
  
  console.log('\n=== TEST TERMINÉ ===\n');
}

// Exécution du test
testAuthRoutes().catch(error => {
  console.error('Erreur non gérée:', error.message);
}); 