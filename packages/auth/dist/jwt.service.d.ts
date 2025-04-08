import { JWTPayload, TokenPair, VerifyTokenResult } from './types';
export declare class JWTService {
    private static readonly JWT_SECRET;
    private static readonly JWT_REFRESH_SECRET;
    private static readonly ACCESS_TOKEN_EXPIRY;
    private static readonly REFRESH_TOKEN_EXPIRY;
    private static redis;
    static initRedis(options?: Record<string, any>): void;
    static generateTokens(userId: string, role?: string): TokenPair;
    static verifyToken(token: string): Promise<VerifyTokenResult>;
    static verifyRefreshToken(token: string): Promise<VerifyTokenResult>;
    static revokeToken(token: string): Promise<void>;
    static refreshTokens(refreshToken: string): Promise<TokenPair | null>;
    static extractUserFromToken(token: string): JWTPayload | null;
    static hasRole(token: string, role: string): boolean;
}
