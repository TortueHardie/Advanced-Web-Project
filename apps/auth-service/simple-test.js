// Script de test basique
const axios = require('axios');

async function testAuth() {
  console.log("=== TEST SIMPLE DU SERVICE D'AUTHENTIFICATION ===");
  
  try {
    const response = await axios.get('http://localhost:3050/health', { timeout: 3000 });
    
    console.log(`Statut: ${response.status} ${response.statusText}`);
    console.log("Réponse du service d'authentification:");
    console.log(response.data);
    
    console.log("Test réussi !");
  } catch (error) {
    console.error("Erreur lors du test:", error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error("Le service n'est pas accessible sur le port 3050. Vérifiez qu'il est bien démarré.");
    }
  }
}

testAuth(); 