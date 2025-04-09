#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config();

// Configuration des URLs
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3005';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';

// Générer un email unique pour chaque test
const timestamp = Date.now();
const newUser = {
  email: `test-${timestamp}@example.com`,
  password: 'Password123!',
  name: `Test User ${timestamp}`
};

console.log('\n=== TEST D\'INSCRIPTION ET D\'OBTENTION DE TOKEN ===\n');
console.log('Utilisateur de test:', newUser.email);

// Fonction pour effectuer l'inscription
async function testRegister() {
  try {
    console.log('Tentative d\'inscription...');
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, newUser);
    
    console.log('\x1b[32mInscription réussie!\x1b[0m');
    console.log('Status:', response.status);
    console.log('Message:', response.data.message);
    
    if (response.data.accessToken) {
      console.log('\x1b[32mToken JWT obtenu avec succès!\x1b[0m');
      console.log('Token JWT:', response.data.accessToken.substring(0, 20) + '...');
      console.log('Refresh Token:', response.data.refreshToken.substring(0, 20) + '...');
      console.log('User ID:', response.data.userId);
      
      // Sauvegarder les tokens dans un fichier pour une utilisation ultérieure
      const fs = require('fs');
      fs.writeFileSync('tokens.json', JSON.stringify({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        userId: response.data.userId,
        timestamp: new Date().toISOString()
      }, null, 2));
      
      console.log('\nTokens sauvegardés dans tokens.json pour une utilisation ultérieure');
    } else {
      console.log('\x1b[31mAucun token JWT n\'a été reçu.\x1b[0m');
    }
  } catch (error) {
    console.log('\x1b[31mErreur lors de l\'inscription:\x1b[0m');
    console.log('Status:', error.response?.status || 'Inconnu');
    console.log('Message:', error.response?.data?.message || error.message);
    
    // Afficher l'erreur complète pour le débogage
    console.log('\nDétails de l\'erreur:');
    console.log(error.response?.data || error);
  }
}

testRegister(); 