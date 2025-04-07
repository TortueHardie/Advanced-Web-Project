// Utilitaire pour obtenir les tokens de développement
const { generateUserToken, generateAdminToken, generateRestaurantToken } = require('./dist/utils/dev-auth-token');

// Générer les tokens
const userToken = generateUserToken();
const adminToken = generateAdminToken();
const restaurantToken = generateRestaurantToken();

// Afficher les tokens dans la console
console.log('\n===== TOKENS DE DÉVELOPPEMENT =====');
console.log('\n🧑 Token Utilisateur:');
console.log(`Bearer ${userToken}`);
console.log('\n🍴 Token Restaurant:');
console.log(`Bearer ${restaurantToken}`);
console.log('\n👑 Token Admin:');
console.log(`Bearer ${adminToken}`);
console.log('\n=================================\n'); 