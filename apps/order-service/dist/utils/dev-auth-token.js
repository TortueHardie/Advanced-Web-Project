"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDevelopmentTokens = exports.generateRestaurantToken = exports.generateAdminToken = exports.generateUserToken = void 0;
const generateMockJwt = (payload, expiresInHours = 24) => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const exp = now + (expiresInHours * 60 * 60);
    const tokenPayload = {
        ...payload,
        iat: now,
        exp
    };
    const b64Header = Buffer.from(JSON.stringify(header)).toString('base64').replace(/=/g, '');
    const b64Payload = Buffer.from(JSON.stringify(tokenPayload)).toString('base64').replace(/=/g, '');
    const signature = 'DEV_TEST_SIGNATURE';
    return `${b64Header}.${b64Payload}.${signature}`;
};
const generateUserToken = (userId = 1, name = 'Test User') => {
    return generateMockJwt({
        sub: userId,
        name,
        role: 'user'
    });
};
exports.generateUserToken = generateUserToken;
const generateAdminToken = (userId = 999, name = 'Admin User') => {
    return generateMockJwt({
        sub: userId,
        name,
        role: 'admin'
    });
};
exports.generateAdminToken = generateAdminToken;
const generateRestaurantToken = (userId = 100, restaurantId = 1, name = 'Restaurant Owner') => {
    return generateMockJwt({
        sub: userId,
        name,
        role: 'restaurant',
        restaurantId
    });
};
exports.generateRestaurantToken = generateRestaurantToken;
const printDevelopmentTokens = () => {
    console.log('\n===== TOKENS DE DÉVELOPPEMENT =====');
    console.log('\n🧑 Token Utilisateur:');
    console.log(`Bearer ${(0, exports.generateUserToken)()}`);
    console.log('\n🍴 Token Restaurant:');
    console.log(`Bearer ${(0, exports.generateRestaurantToken)()}`);
    console.log('\n👑 Token Admin:');
    console.log(`Bearer ${(0, exports.generateAdminToken)()}`);
    console.log('\n=================================\n');
};
exports.printDevelopmentTokens = printDevelopmentTokens;
if (require.main === module) {
    (0, exports.printDevelopmentTokens)();
}
//# sourceMappingURL=dev-auth-token.js.map