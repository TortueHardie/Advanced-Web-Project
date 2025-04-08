"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const swagger_1 = require("@nestjs/swagger");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const dto_1 = require("../dto");
let AuthController = class AuthController {
    authService;
    httpService;
    authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:3001';
    constructor(authService, httpService) {
        this.authService = authService;
        this.httpService = httpService;
    }
    async forwardRequest(path, method, authHeader, body) {
        const headers = {};
        if (authHeader) {
            headers['Authorization'] = authHeader;
        }
        try {
            let response;
            const url = `${this.authServiceUrl}/auth/${path}`;
            switch (method) {
                case 'GET':
                    response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { headers }));
                    break;
                case 'POST':
                    response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, body, { headers }));
                    break;
                case 'PUT':
                    response = await (0, rxjs_1.firstValueFrom)(this.httpService.put(url, body, { headers }));
                    break;
                case 'DELETE':
                    response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(url, { headers }));
                    break;
            }
            return response.data;
        }
        catch (error) {
            if (error.response?.status === 401) {
                throw new common_1.UnauthorizedException(error.response?.data?.message || 'Non autorisé');
            }
            throw error;
        }
    }
    async verifyToken(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Token manquant ou format invalide');
        }
        const token = authHeader.substring(7);
        const result = await this.authService.verifyToken(token);
        if (!result.isValid) {
            throw new common_1.UnauthorizedException(result.error);
        }
        return { isValid: true, user: result.user };
    }
    async login(loginDto) {
        return this.forwardRequest('login', 'POST', undefined, loginDto);
    }
    async register(registerDto) {
        return this.forwardRequest('register', 'POST', undefined, registerDto);
    }
    async refresh(refreshDto) {
        return this.forwardRequest('refresh', 'POST', undefined, refreshDto);
    }
    async revoke(authHeader) {
        return this.forwardRequest('revoke', 'POST', authHeader);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Vérifie si le token JWT est valide' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token valide', type: Object }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token invalide ou expiré' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Connexion utilisateur' }),
    (0, swagger_1.ApiBody)({ type: dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Connexion réussie, tokens retournés',
        type: dto_1.TokenResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Identifiants invalides' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Inscription utilisateur' }),
    (0, swagger_1.ApiBody)({ type: dto_1.RegisterDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Inscription réussie, tokens retournés',
        type: dto_1.TokenResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email déjà utilisé' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Rafraîchir les tokens' }),
    (0, swagger_1.ApiBody)({ type: dto_1.RefreshTokenDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tokens rafraîchis avec succès',
        type: dto_1.TokenResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token de rafraîchissement invalide' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('revoke'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Révoquer un token' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token révoqué avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token invalide' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revoke", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        axios_1.HttpService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map