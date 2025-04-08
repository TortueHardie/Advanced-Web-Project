"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.requireAuth = requireAuth;
exports.requireAdmin = requireAdmin;
exports.requireRestaurant = requireRestaurant;
exports.requireRestaurantOrAdmin = requireRestaurantOrAdmin;
const jwt_service_1 = require("./jwt.service");
function authenticate(options = {}) {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                if (options.failWithError) {
                    return res.status(401).json({ message: 'Token manquant ou format invalide' });
                }
                return next();
            }
            const token = authHeader.substring(7);
            const result = await jwt_service_1.JWTService.verifyToken(token);
            if (!result.isValid || !result.user) {
                if (options.failWithError) {
                    return res.status(401).json({ message: result.error || 'Token invalide' });
                }
                return next();
            }
            if (options.roles && options.roles.length > 0) {
                const hasRole = options.roles.includes(result.user.role || '');
                if (!hasRole) {
                    return res.status(403).json({ message: 'Accès non autorisé - rôle insuffisant' });
                }
            }
            req.user = {
                userId: result.user.userId,
                role: result.user.role
            };
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
function requireAuth(roles) {
    return authenticate({ failWithError: true, roles });
}
function requireAdmin() {
    return requireAuth(['admin']);
}
function requireRestaurant() {
    return requireAuth(['restaurant']);
}
function requireRestaurantOrAdmin() {
    return requireAuth(['admin', 'restaurant']);
}
//# sourceMappingURL=auth.middleware.js.map