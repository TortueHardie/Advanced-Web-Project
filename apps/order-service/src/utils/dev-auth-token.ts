/**
 * Utilitaire pour générer des tokens JWT de test pour les développeurs
 * Utiliser uniquement en développement, pas en production
 */

// Mock JWT - En production, utilisez une vraie librairie JWT
const generateMockJwt = (payload: Record<string, any>, expiresInHours = 24): string => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (expiresInHours * 60 * 60);
  
  const tokenPayload = {
    ...payload,
    iat: now,
    exp
  };
  
  // Encode en base64
  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64').replace(/=/g, '');
  const b64Payload = Buffer.from(JSON.stringify(tokenPayload)).toString('base64').replace(/=/g, '');
  
  // Signature mock (pour test uniquement)
  const signature = 'DEV_TEST_SIGNATURE';
  
  // Format JWT
  return `${b64Header}.${b64Payload}.${signature}`;
};

// Générer un token utilisateur standard
export const generateUserToken = (userId = 1, name = 'Test User'): string => {
  return generateMockJwt({
    sub: userId,
    name,
    role: 'user'
  });
};

// Générer un token admin
export const generateAdminToken = (userId = 999, name = 'Admin User'): string => {
  return generateMockJwt({
    sub: userId,
    name,
    role: 'admin'
  });
};

// Générer un token restaurant
export const generateRestaurantToken = (userId = 100, restaurantId = 1, name = 'Restaurant Owner'): string => {
  return generateMockJwt({
    sub: userId,
    name,
    role: 'restaurant',
    restaurantId
  });
};

// Fonction utilitaire pour imprimer les tokens dans la console
export const printDevelopmentTokens = (): void => {
  console.log('\n===== TOKENS DE DÉVELOPPEMENT =====');
  console.log('\n🧑 Token Utilisateur:');
  console.log(`Bearer ${generateUserToken()}`);
  
  console.log('\n🍴 Token Restaurant:');
  console.log(`Bearer ${generateRestaurantToken()}`);
  
  console.log('\n👑 Token Admin:');
  console.log(`Bearer ${generateAdminToken()}`);
  console.log('\n=================================\n');
};

// Exécuter cette fonction directement si ce fichier est appelé avec Node
if (require.main === module) {
  printDevelopmentTokens();
} 