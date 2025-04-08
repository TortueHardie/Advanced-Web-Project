"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jwt = require("jsonwebtoken");
const ioredis_1 = require("ioredis");
class JWTService {
    static initRedis(options) {
        this.redis = new ioredis_1.Redis(Object.assign({ host: process.env.REDIS_HOST || 'localhost', port: parseInt(process.env.REDIS_PORT || '6379') }, options));
    }
    static generateTokens(userId, role) {
        const payload = { userId };
        if (role) {
            payload.role = role;
        }
        const accessToken = jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.ACCESS_TOKEN_EXPIRY });
        const refreshToken = jwt.sign(payload, this.JWT_REFRESH_SECRET, { expiresIn: this.REFRESH_TOKEN_EXPIRY });
        return { accessToken, refreshToken };
    }
    static async verifyToken(token) {
        try {
            if (!this.redis) {
                this.initRedis();
            }
            const isBlacklisted = await this.redis.get(`blacklist:${token}`);
            if (isBlacklisted) {
                return { isValid: false, error: 'Token révoqué' };
            }
            const decoded = jwt.verify(token, this.JWT_SECRET);
            return { isValid: true, user: decoded };
        }
        catch (error) {
            const err = error;
            return { isValid: false, error: err.message };
        }
    }
    static async verifyRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, this.JWT_REFRESH_SECRET);
            return { isValid: true, user: decoded };
        }
        catch (error) {
            const err = error;
            return { isValid: false, error: err.message };
        }
    }
    static async revokeToken(token) {
        try {
            if (!this.redis) {
                this.initRedis();
            }
            const decoded = jwt.decode(token);
            if (!decoded || !decoded.exp) {
                throw new Error('Token invalide');
            }
            const ttl = decoded.exp - Math.floor(Date.now() / 1000);
            if (ttl > 0) {
                await this.redis.set(`blacklist:${token}`, '1', 'EX', ttl);
            }
        }
        catch (error) {
            console.error('Erreur lors de la révocation du token:', error);
            throw error;
        }
    }
    static async refreshTokens(refreshToken) {
        const result = await this.verifyRefreshToken(refreshToken);
        if (!result.isValid || !result.user) {
            return null;
        }
        return this.generateTokens(result.user.userId, result.user.role);
    }
    static extractUserFromToken(token) {
        try {
            if (!token)
                return null;
            const actualToken = token.startsWith('Bearer ')
                ? token.substring(7)
                : token;
            const decoded = jwt.decode(actualToken);
            return decoded;
        }
        catch (error) {
            console.error('Erreur lors de l\'extraction des informations utilisateur:', error);
            return null;
        }
    }
    static hasRole(token, role) {
        const user = this.extractUserFromToken(token);
        return (user === null || user === void 0 ? void 0 : user.role) === role;
    }
}
exports.JWTService = JWTService;
JWTService.JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt';
JWTService.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'votre-secret-refresh';
JWTService.ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '15m';
JWTService.REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '1d';
//# sourceMappingURL=jwt.service.js.map