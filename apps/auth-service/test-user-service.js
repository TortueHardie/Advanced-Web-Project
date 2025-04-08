#!/usr/bin/env node

const axios = require('axios');

// Configuration de l'URL du service utilisateur
const USER_SERVICE_URL = 'http://localhost:3001';

async function testUserService() {
  console.log('\n=== TEST DE CONNECTIVITÉ AU SERVICE UTILISATEUR ===\n');
  console.log(`URL testée: ${USER_SERVICE_URL}`);
  
  try {
    // Effectuer une requête au service utilisateur
    console.log('Tentative de connexion au service utilisateur...');
    const response = await axios.get(`${USER_SERVICE_URL}/users/health`);
    
    console.log('\x1b[32mConnexion réussie!\x1b[0m');
    console.log('Status:', response.status);
    console.log('Réponse:', response.data);
  } catch (error) {
    console.log('\x1b[31mErreur de connexion:\x1b[0m');
    
    if (error.response) {
      // La requête a été faite et le serveur a répondu avec un code d'état
      console.log('Status:', error.response.status);
      console.log('Headers:', error.response.headers);
      console.log('Data:', error.response.data);
      
      // Si le service n'a pas de route /health, essayons une autre route
      if (error.response.status === 404) {
        console.log('\nLa route /health n\'existe pas. Essai avec une autre route...');
        try {
          const usersResponse = await axios.get(`${USER_SERVICE_URL}/users`);
          console.log('\x1b[32mConnexion réussie avec la route /users!\x1b[0m');
          console.log('Status:', usersResponse.status);
          console.log('Data:', usersResponse.data);
        } catch (usersError) {
          console.log('\x1b[31mErreur avec la route /users:\x1b[0m');
          console.log('Status:', usersError.response?.status || 'Inconnu');
          console.log('Message:', usersError.message);
        }
      }
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.log('\x1b[31mAucune réponse reçue du serveur\x1b[0m');
      console.log('Request:', error.request);
      console.log('Message:', error.message);
    } else {
      // Quelque chose s'est produit lors de la configuration de la requête
      console.log('\x1b[31mErreur lors de la configuration de la requête\x1b[0m');
      console.log('Message:', error.message);
    }
  }
  
  console.log('\n=== FIN DU TEST ===\n');
}

// Afficher les erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.log('\n\x1b[31mErreur non gérée lors d\'une promesse:\x1b[0m');
  console.log('Raison:', reason);
});

// Exécuter le test
testUserService().catch(error => {
  console.error('\n\x1b[31mErreur non gérée dans la fonction principale:\x1b[0m', error.message);
}); 