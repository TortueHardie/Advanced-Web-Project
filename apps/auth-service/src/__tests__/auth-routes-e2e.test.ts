import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Configuration
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3005';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';

// Données de test
const testUser = {
  email: `test-${Date.now()}@example.com`,
  password: 'Password123!',
  name: 'Test User'
};

let accessToken: string;
let refreshToken: string;
let userId: string;

// Fonction pour formater les résultats
const formatResult = (route: string, method: string, status: number, success: boolean) => {
  const statusColor = success ? '\x1b[32m' : '\x1b[31m'; // Vert pour succès, rouge pour échec
  console.log(`${statusColor}${method} ${route}: ${status} - ${success ? 'OK' : 'ÉCHEC'}\x1b[0m`);
  return { route, method, status, success };
};

describe('Tests fonctionnels des routes d\'authentification', () => {
  
  beforeAll(async () => {
    // S'assurer que les services sont disponibles
    try {
      await axios.get(`${AUTH_SERVICE_URL}/health`);
    } catch (error) {
      console.warn('Service d\'authentification non disponible ou n\'a pas de route /health. Les tests peuvent échouer.');
    }
  });
  
  test('1. Inscription (POST /auth/register)', async () => {
    try {
      const response = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, testUser);
      
      // Vérification de la réponse
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('accessToken');
      expect(response.data).toHaveProperty('refreshToken');
      expect(response.data).toHaveProperty('userId');
      
      // Sauvegarder les tokens pour les tests suivants
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
      userId = response.data.userId;
      
      formatResult('/auth/register', 'POST', response.status, true);
    } catch (error: any) {
      const status = error.response?.status || 500;
      formatResult('/auth/register', 'POST', status, false);
      fail(`L'inscription a échoué: ${error.message}`);
    }
  });
  
  test('2. Connexion (POST /auth/login)', async () => {
    try {
      const response = await axios.post(`${AUTH_SERVICE_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      
      // Vérification de la réponse
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('accessToken');
      expect(response.data).toHaveProperty('refreshToken');
      
      // Mise à jour des tokens
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
      
      formatResult('/auth/login', 'POST', response.status, true);
    } catch (error: any) {
      const status = error.response?.status || 500;
      formatResult('/auth/login', 'POST', status, false);
      fail(`La connexion a échoué: ${error.message}`);
    }
  });
  
  test('3. Vérification du token (POST /auth/verify)', async () => {
    try {
      const response = await axios.post(
        `${AUTH_SERVICE_URL}/auth/verify`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      
      // Vérification de la réponse
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('valid', true);
      
      formatResult('/auth/verify', 'POST', response.status, true);
    } catch (error: any) {
      const status = error.response?.status || 500;
      formatResult('/auth/verify', 'POST', status, false);
      fail(`La vérification du token a échoué: ${error.message}`);
    }
  });
  
  test('4. Rafraîchissement du token (POST /auth/refresh)', async () => {
    try {
      const response = await axios.post(`${AUTH_SERVICE_URL}/auth/refresh`, {
        refreshToken
      });
      
      // Vérification de la réponse
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('accessToken');
      expect(response.data).toHaveProperty('refreshToken');
      
      // Mise à jour des tokens
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
      
      formatResult('/auth/refresh', 'POST', response.status, true);
    } catch (error: any) {
      const status = error.response?.status || 500;
      formatResult('/auth/refresh', 'POST', status, false);
      fail(`Le rafraîchissement du token a échoué: ${error.message}`);
    }
  });
  
  test('5. Révocation du token (POST /auth/revoke)', async () => {
    try {
      const response = await axios.post(
        `${AUTH_SERVICE_URL}/auth/revoke`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      
      // Vérification de la réponse
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('message', 'Token révoqué avec succès');
      
      formatResult('/auth/revoke', 'POST', response.status, true);
    } catch (error: any) {
      const status = error.response?.status || 500;
      formatResult('/auth/revoke', 'POST', status, false);
      fail(`La révocation du token a échoué: ${error.message}`);
    }
  });
  
  // Test optionnel - vérifier que le token révoqué ne fonctionne plus
  test('6. Vérification que le token révoqué ne fonctionne plus', async () => {
    try {
      await axios.post(
        `${AUTH_SERVICE_URL}/auth/verify`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      
      fail('Le token révoqué ne devrait pas être valide');
    } catch (error: any) {
      // On s'attend à une erreur 401
      expect(error.response?.status).toBe(401);
      formatResult('/auth/verify (avec token révoqué)', 'POST', error.response?.status, true);
    }
  });

  // Nettoyage - suppression de l'utilisateur de test si possible
  afterAll(async () => {
    if (userId) {
      try {
        // Tenter de supprimer l'utilisateur de test si le service utilisateur a cette fonctionnalité
        await axios.delete(`${USER_SERVICE_URL}/users/${userId}`);
        console.log('Utilisateur de test supprimé avec succès');
      } catch (error) {
        console.warn('Impossible de supprimer l\'utilisateur de test, nettoyage manuel peut être nécessaire');
      }
    }
  });
}); 