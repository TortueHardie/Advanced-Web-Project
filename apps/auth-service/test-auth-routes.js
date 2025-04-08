#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config();

// Configuration
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3005';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';

// Données de test
const testUser = {
  email: `test-${Date.now()}@example.com`,
  password: 'Password123!',
  name: 'Test User'
};

let accessToken;
let refreshToken;
let userId;

// Fonction pour formater les résultats
const formatResult = (route, method, status, success) => {
  const statusColor = success ? '\x1b[32m' : '\x1b[31m'; // Vert pour succès, rouge pour échec
  console.log(`${statusColor}${method} ${route}: ${status} - ${success ? 'OK' : 'ÉCHEC'}\x1b[0m`);
  return { route, method, status, success };
};

// Fonction pour tester une route
const testRoute = async (method, route, data = null, headers = {}) => {
  try {
    const config = { headers };
    let response;

    if (method === 'GET') {
      response = await axios.get(`${AUTH_SERVICE_URL}${route}`, config);
    } else if (method === 'POST') {
      response = await axios.post(`${AUTH_SERVICE_URL}${route}`, data, config);
    } else if (method === 'PUT') {
      response = await axios.put(`${AUTH_SERVICE_URL}${route}`, data, config);
    } else if (method === 'DELETE') {
      response = await axios.delete(`${AUTH_SERVICE_URL}${route}`, config);
    }

    formatResult(route, method, response.status, true);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: error.message };
    formatResult(route, method, status, false);
    return { success: false, data, status, error: error.message };
  }
};

// Fonction principale
const runTests = async () => {
  console.log('\n=== TESTS DES ROUTES D\'AUTHENTIFICATION ===\n');
  
  // 1. Vérifier la disponibilité du service d'authentification
  console.log('Étape 1: Vérification de la disponibilité du service d\'authentification');
  const healthCheckResult = await testRoute('GET', '/health');
  
  if (!healthCheckResult.success) {
    console.warn('\nAttention: Le service d\'authentification n\'est pas disponible ou n\'a pas de route /health.');
    console.warn('Vérifiez que le service est en cours d\'exécution sur:', AUTH_SERVICE_URL);
    console.warn('Les tests continuent malgré tout...\n');
  } else {
    console.log('Service d\'authentification disponible!');
  }
  
  // 2. Vérifier la connectivité avec le service utilisateur
  console.log('\nÉtape 2: Vérification de la connectivité avec le service utilisateur');
  const userServiceCheckResult = await testRoute('GET', '/health/check-user-service');
  
  if (!userServiceCheckResult.success) {
    console.warn('\nAttention: Problème de connectivité avec le service utilisateur.');
    console.warn('Détails:', userServiceCheckResult.data);
    console.warn('Les tests continuent malgré tout...\n');
  } else {
    console.log('Connectivité avec le service utilisateur OK!');
    console.log('Détails:', JSON.stringify(userServiceCheckResult.data, null, 2));
  }
  
  // 3. Test d'inscription
  console.log('\n--- Test d\'inscription ---');
  const registerResult = await testRoute('POST', '/auth/register', testUser);
  if (registerResult.success) {
    accessToken = registerResult.data.accessToken;
    refreshToken = registerResult.data.refreshToken;
    userId = registerResult.data.userId;
    console.log(`Utilisateur créé avec ID: ${userId}`);
  } else {
    console.error('Erreur lors de l\'inscription:', registerResult.data.message);
  }
  
  // 4. Test de connexion
  console.log('\n--- Test de connexion ---');
  const loginResult = await testRoute('POST', '/auth/login', {
    email: testUser.email,
    password: testUser.password
  });
  if (loginResult.success) {
    accessToken = loginResult.data.accessToken;
    refreshToken = loginResult.data.refreshToken;
    console.log('Connexion réussie');
  }
  
  // 5. Test de vérification de token
  console.log('\n--- Test de vérification de token ---');
  if (accessToken) {
    const verifyResult = await testRoute('POST', '/auth/verify', {}, {
      Authorization: `Bearer ${accessToken}`
    });
    if (verifyResult.success) {
      console.log('Token valide');
    }
  } else {
    console.log('Impossible de tester la vérification du token car aucun token n\'a été obtenu');
  }
  
  // 6. Test de rafraîchissement de token
  console.log('\n--- Test de rafraîchissement de token ---');
  if (refreshToken) {
    const refreshResult = await testRoute('POST', '/auth/refresh', {
      refreshToken
    });
    if (refreshResult.success) {
      accessToken = refreshResult.data.accessToken;
      refreshToken = refreshResult.data.refreshToken;
      console.log('Token rafraîchi avec succès');
    }
  } else {
    console.log('Impossible de tester le rafraîchissement du token car aucun refresh token n\'a été obtenu');
  }
  
  // 7. Test de révocation de token
  console.log('\n--- Test de révocation de token ---');
  if (accessToken) {
    const revokeResult = await testRoute('POST', '/auth/revoke', {}, {
      Authorization: `Bearer ${accessToken}`
    });
    if (revokeResult.success) {
      console.log('Token révoqué avec succès');
    }
  } else {
    console.log('Impossible de tester la révocation du token car aucun token n\'a été obtenu');
  }
  
  // 8. Test pour vérifier que le token révoqué ne fonctionne plus
  console.log('\n--- Test de token révoqué ---');
  if (accessToken) {
    const invalidTokenResult = await testRoute('POST', '/auth/verify', {}, {
      Authorization: `Bearer ${accessToken}`
    });
    // On s'attend à un échec ici (401)
    if (!invalidTokenResult.success && invalidTokenResult.status === 401) {
      console.log('\x1b[32mTest réussi: Le token révoqué a bien été rejeté\x1b[0m');
    } else {
      console.log('\x1b[31mTest échoué: Le token révoqué a été accepté (ne devrait pas arriver)\x1b[0m');
    }
  } else {
    console.log('Impossible de tester la vérification du token révoqué car aucun token n\'a été obtenu');
  }
  
  // Nettoyage - Supprimer l'utilisateur de test si possible
  if (userId) {
    console.log('\n--- Nettoyage des données de test ---');
    try {
      const deleteResult = await axios.delete(`${USER_SERVICE_URL}/users/${userId}`);
      console.log(`Utilisateur de test supprimé avec succès (statut: ${deleteResult.status})`);
    } catch (error) {
      console.warn('Impossible de supprimer l\'utilisateur de test, nettoyage manuel peut être nécessaire');
    }
  }
  
  // Résumé
  console.log('\n=== RÉSUMÉ DES TESTS ===');
  console.log('Routes testées: 5');
  console.log('Email de test utilisé:', testUser.email);
  console.log('\n');
};

// Exécuter les tests
runTests().catch(error => {
  console.error('Erreur lors de l\'exécution des tests:', error.message);
}); 