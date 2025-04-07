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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let UserController = class UserController {
    httpService;
    userServiceUrl = process.env.USER_SERVICE_URL || 'http://user-service:3001';
    constructor(httpService) {
        this.httpService = httpService;
    }
    async forwardRequest(url, method, authHeader, body) {
        const headers = {};
        if (authHeader) {
            headers['Authorization'] = authHeader;
        }
        try {
            let response;
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
    async create(createUserDto) {
        return this.forwardRequest(`${this.userServiceUrl}/users`, 'POST', undefined, createUserDto);
    }
    async findAll(authHeader) {
        return this.forwardRequest(`${this.userServiceUrl}/users`, 'GET', authHeader);
    }
    async findOne(authHeader, id) {
        return this.forwardRequest(`${this.userServiceUrl}/users/${id}`, 'GET', authHeader);
    }
    async update(authHeader, id, updateUserDto) {
        return this.forwardRequest(`${this.userServiceUrl}/users/${id}`, 'PUT', authHeader, updateUserDto);
    }
    async remove(authHeader, id) {
        return this.forwardRequest(`${this.userServiceUrl}/users/${id}`, 'DELETE', authHeader);
    }
    async validateUser(credentials) {
        return this.forwardRequest(`${this.userServiceUrl}/users/validate`, 'POST', undefined, credentials);
    }
    async findByEmail(authHeader, email) {
        return this.forwardRequest(`${this.userServiceUrl}/users/by-email/${email}`, 'GET', authHeader);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouvel utilisateur' }),
    (0, swagger_1.ApiBody)({ description: 'Informations de l\'utilisateur à créer' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Utilisateur créé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email déjà existant' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les utilisateurs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des utilisateurs récupérée' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un utilisateur par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de l\'utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Utilisateur récupéré' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un utilisateur' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de l\'utilisateur' }),
    (0, swagger_1.ApiBody)({ description: 'Informations à mettre à jour' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Utilisateur mis à jour' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un utilisateur' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de l\'utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Utilisateur supprimé' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('validate'),
    (0, swagger_1.ApiOperation)({ summary: 'Valider les identifiants utilisateur (utilisé par le service d\'authentification)' }),
    (0, swagger_1.ApiBody)({ description: 'Email et mot de passe à valider' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Identifiants validés' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Identifiants invalides' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUser", null);
__decorate([
    (0, common_1.Get)('by-email/:email'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un utilisateur par email' }),
    (0, swagger_1.ApiParam)({ name: 'email', description: 'Email de l\'utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Utilisateur récupéré' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByEmail", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Utilisateurs'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [axios_1.HttpService])
], UserController);
//# sourceMappingURL=user.controller.js.map