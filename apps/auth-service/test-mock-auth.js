const axios = require('axios');
const assert = require('assert');

const BASE_URL = 'http://localhost:3030';
const EMAIL = `test-${Date.now()}@example.com`;
const PASSWORD = 'password123';
const NAME = 'Test User';

// Pour stocker les tokens après inscription/connexion
let accessToken;
let refreshToken;
let userId;

// Fonction pour effectuer les tests
async function runTests() {
  console.log('=== TESTS DU SERVICE D\'AUTHENTIFICATION MOCK ===');
  
  try {
    // Test 1: Vérification de la disponibilité du service
    console.log('\n1. Test de disponibilité du service');
    try {
      const healthResponse = await axios.get(`${BASE_URL}/health`);
      console.log(`GET /health - ${healthResponse.status === 200 ? 'OK' : 'ÉCHEC'}`);
      console.log('Réponse:', healthResponse.data);
    } catch (error) {
      console.log('GET /health - ÉCHEC');
      console.log('Erreur de connexion:', error.message);
      console.log('Le service est-il démarré sur le port 3030?');
      return;
    }
    
    // Test 2: Inscription
    console.log('\n2. Test d\'inscription');
    try {
      const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
        email: EMAIL,
        password: PASSWORD,
        name: NAME
      });
      
      accessToken = registerResponse.data.accessToken;
      refreshToken = registerResponse.data.refreshToken;
      userId = registerResponse.data.userId;
      
      console.log(`POST /auth/register - ${registerResponse.status === 201 ? 'OK' : 'ÉCHEC'}`);
      console.log('Utilisateur créé avec ID:', userId);
      console.log('Access Token obtenu:', accessToken ? 'Oui' : 'Non');
      console.log('Refresh Token obtenu:', refreshToken ? 'Oui' : 'Non');
    } catch (error) {
      console.log('POST /auth/register - ÉCHEC');
      console.log('Erreur:', error.response ? error.response.data : error.message);
      // Utiliser l'utilisateur existant pour les tests suivants
      console.log('\nTentative de connexion avec un utilisateur existant...');
      await testLogin('test@example.com', PASSWORD);
    }
    
    // Test 3: Vérification du token
    console.log('\n3. Test de vérification du token');
    if (accessToken) {
      try {
        const verifyResponse = await axios.post(
          `${BASE_URL}/auth/verify`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log(`POST /auth/verify - ${verifyResponse.status === 200 ? 'OK' : 'ÉCHEC'}`);
        console.log('Token valide:', verifyResponse.data.valid);
      } catch (error) {
        console.log('POST /auth/verify - ÉCHEC');
        console.log('Erreur:', error.response ? error.response.data : error.message);
      }
    } else {
      console.log('POST /auth/verify - IGNORÉ (pas de token disponible)');
    }
    
    // Test 4: Actualisation du token
    console.log('\n4. Test d\'actualisation du token');
    if (refreshToken) {
      try {
        const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken
        });
        
        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken = refreshResponse.data.refreshToken;
        
        console.log(`POST /auth/refresh - ${refreshResponse.status === 200 ? 'OK' : 'ÉCHEC'}`);
        console.log('Nouveau Access Token obtenu:', newAccessToken ? 'Oui' : 'Non');
        console.log('Nouveau Refresh Token obtenu:', newRefreshToken ? 'Oui' : 'Non');
        
        // Mettre à jour les tokens pour les tests suivants
        if (newAccessToken) accessToken = newAccessToken;
        if (newRefreshToken) refreshToken = newRefreshToken;
      } catch (error) {
        console.log('POST /auth/refresh - ÉCHEC');
        console.log('Erreur:', error.response ? error.response.data : error.message);
      }
    } else {
      console.log('POST /auth/refresh - IGNORÉ (pas de refresh token disponible)');
    }
    
    // Test 5: Révocation du token
    console.log('\n5. Test de révocation du token');
    if (accessToken) {
      try {
        const revokeResponse = await axios.post(
          `${BASE_URL}/auth/revoke`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log(`POST /auth/revoke - ${revokeResponse.status === 200 ? 'OK' : 'ÉCHEC'}`);
        console.log('Réponse:', revokeResponse.data);
        
        // Vérifier que le token révoqué n'est plus valide
        console.log('\n6. Test de vérification du token révoqué');
        try {
          const verifyRevokedResponse = await axios.post(
            `${BASE_URL}/auth/verify`,
            {},
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          console.log(`POST /auth/verify (token révoqué) - ÉCHEC (devrait être rejeté mais a été accepté)`);
          console.log('Réponse inattendue:', verifyRevokedResponse.data);
        } catch (error) {
          console.log('POST /auth/verify (token révoqué) - OK (token correctement rejeté)');
          console.log('Erreur attendue:', error.response ? error.response.data : error.message);
        }
      } catch (error) {
        console.log('POST /auth/revoke - ÉCHEC');
        console.log('Erreur:', error.response ? error.response.data : error.message);
      }
    } else {
      console.log('POST /auth/revoke - IGNORÉ (pas de token disponible)');
    }
    
    console.log('\n=== RÉSUMÉ DES TESTS ===');
    console.log('6 routes testées');
    console.log(`Email de test utilisé: ${EMAIL}`);
    
  } catch (error) {
    console.error('Erreur lors de l\'exécution des tests:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Fonction auxiliaire pour tester la connexion
async function testLogin(email, password) {
  try {
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password
    });
    
    accessToken = loginResponse.data.accessToken;
    refreshToken = loginResponse.data.refreshToken;
    userId = loginResponse.data.userId;
    
    console.log(`POST /auth/login - ${loginResponse.status === 200 ? 'OK' : 'ÉCHEC'}`);
    console.log('Connecté avec ID:', userId);
    console.log('Access Token obtenu:', accessToken ? 'Oui' : 'Non');
    console.log('Refresh Token obtenu:', refreshToken ? 'Oui' : 'Non');
    return true;
  } catch (error) {
    console.log('POST /auth/login - ÉCHEC');
    console.log('Erreur:', error.response ? error.response.data : error.message);
    return false;
  }
}

// Exécuter les tests
runTests(); 