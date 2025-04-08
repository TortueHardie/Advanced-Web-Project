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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const dto_1 = require("../dto");
let OrderController = class OrderController {
    httpService;
    orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://order-service:3002';
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
    async createOrder(authHeader, createOrderDto) {
        return this.forwardRequest(`${this.orderServiceUrl}`, 'POST', authHeader, createOrderDto);
    }
    async getUserOrders(authHeader) {
        return this.forwardRequest(`${this.orderServiceUrl}/me`, 'GET', authHeader);
    }
    async getAdminOrders(authHeader) {
        return this.forwardRequest(`${this.orderServiceUrl}/admin`, 'GET', authHeader);
    }
    async getOrderById(authHeader, orderId) {
        return this.forwardRequest(`${this.orderServiceUrl}/${orderId}`, 'GET', authHeader);
    }
    async cancelOrder(authHeader, orderId) {
        return this.forwardRequest(`${this.orderServiceUrl}/${orderId}/cancel`, 'PUT', authHeader);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle commande' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Commande créée avec succès', type: dto_1.OrderResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les commandes de l\'utilisateur connecté' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des commandes', type: dto_1.OrderListResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrders", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Récupérer toutes les commandes (admin/restaurant)',
        description: 'Nécessite le rôle ADMIN ou RESTAURATEUR'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste de toutes les commandes', type: dto_1.OrderListResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Accès interdit - rôle insuffisant' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAdminOrders", null);
__decorate([
    (0, common_1.Get)(':orderId'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les détails d\'une commande' }),
    (0, swagger_1.ApiParam)({ name: 'orderId', description: 'ID de la commande' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Détails de la commande', type: dto_1.OrderResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Put)(':orderId/cancel'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Annuler une commande' }),
    (0, swagger_1.ApiParam)({ name: 'orderId', description: 'ID de la commande à annuler' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commande annulée avec succès', type: dto_1.OrderResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [axios_1.HttpService])
], OrderController);
//# sourceMappingURL=order.controller.js.map