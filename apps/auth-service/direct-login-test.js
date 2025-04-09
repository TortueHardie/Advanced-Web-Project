#!/usr/bin/env node

const axios = require('axios');

// Configuration de l'URL du service d'authentification
const AUTH_SERVICE_URL = 'http://localhost:3005';

// Données de connexion pour un utilisateur qui devrait exister dans le système
const loginData = {
  email: 'admin@example.com',
  password: 'admin123'
};

console.log('\n=== TEST DE LA ROUTE DE LOGIN ===\n');
console.log('Tentative de connexion avec:', loginData.email);

async function testLogin() {
  try {
    // Tenter de se connecter
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/login`, loginData);
    
    console.log('\x1b[32mConnexion réussie!\x1b[0m');
    console.log('Status:', response.status);
    console.log('Message:', response.data.message);
    
    if (response.data.accessToken) {
      console.log('\x1b[32mToken JWT obtenu:\x1b[0m', response.data.accessToken.substring(0, 20) + '...');
      
      // Sauvegarde du token pour tests ultérieurs
      const fs = require('fs');
      fs.writeFileSync('token.txt', response.data.accessToken);
      console.log('Token sauvegardé dans token.txt');
      
      // Tester la vérification du token
      console.log('\nTest de la vérification du token...');
      try {
        const verifyResponse = await axios.post(
          `${AUTH_SERVICE_URL}/auth/verify`, 
          {}, 
          { headers: { Authorization: `Bearer ${response.data.accessToken}` }}
        );
        
        console.log('\x1b[32mToken vérifié avec succès!\x1b[0m');
        console.log('Status:', verifyResponse.status);
        console.log('Réponse:', verifyResponse.data);
      } catch (verifyError) {
        console.log('\x1b[31mErreur lors de la vérification du token:\x1b[0m');
        console.log('Status:', verifyError.response?.status || 'Inconnu');
        console.log('Message:', verifyError.message);
      }
    } else {
      console.log('\x1b[31mAucun token JWT n\'a été retourné.\x1b[0m');
    }
  } catch (error) {
    console.log('\x1b[31mErreur lors de la connexion:\x1b[0m');
    
    if (error.response) {
      // La requête a été faite et le serveur a répondu avec un code d'état
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      
      // Si l'erreur est 401, essayons de créer un compte
      if (error.response.status === 401) {
        console.log('\nIdentifiants invalides. Tentative d\'inscription...');
        try {
          const registerResponse = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, {
            ...loginData,
            name: 'Admin User'
          });
          
          console.log('\x1b[32mInscription réussie!\x1b[0m');
          console.log('Status:', registerResponse.status);
          console.log('Data:', registerResponse.data);
          
          console.log('\nVeuillez réexécuter ce script pour tester la connexion avec le nouvel utilisateur.');
        } catch (registerError) {
          console.log('\x1b[31mErreur lors de l\'inscription:\x1b[0m');
          console.log('Status:', registerError.response?.status || 'Inconnu');
          console.log('Message:', registerError.message);
        }
      }
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.log('\x1b[31mAucune réponse reçue du serveur\x1b[0m');
      console.log('Message:', error.message);
    } else {
      // Quelque chose s'est produit lors de la configuration de la requête
      console.log('\x1b[31mErreur lors de la configuration de la requête\x1b[0m');
      console.log('Message:', error.message);
    }
  }
}

testLogin(); 