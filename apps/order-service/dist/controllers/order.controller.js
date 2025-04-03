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
const order_service_1 = require("../services/order.service");
const create_order_dto_1 = require("../dto/create-order.dto");
const update_order_status_dto_1 = require("../dto/update-order-status.dto");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../dto/response.dto");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getUserIdFromToken(authHeader) {
        if (!authHeader) {
            console.warn('No authorization header provided - using default user ID for development');
            return 1;
        }
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.replace('Bearer ', '')
            : authHeader;
        try {
            const payloadBase64 = token.split('.')[1];
            if (!payloadBase64) {
                console.warn('Invalid token format, using default user ID');
                return 1;
            }
            const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf8'));
            return payload.sub || 1;
        }
        catch (error) {
            console.warn('Token parsing error:', error);
            return 1;
        }
    }
    isAdmin(authHeader) {
        if (!authHeader)
            return false;
        try {
            const token = authHeader.startsWith('Bearer ')
                ? authHeader.replace('Bearer ', '')
                : authHeader;
            const payloadBase64 = token.split('.')[1];
            if (!payloadBase64) {
                return authHeader.includes('admin');
            }
            const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf8'));
            return payload.role === 'admin';
        }
        catch (error) {
            return authHeader.includes('admin');
        }
    }
    isRestaurant(authHeader) {
        if (!authHeader)
            return false;
        try {
            const token = authHeader.startsWith('Bearer ')
                ? authHeader.replace('Bearer ', '')
                : authHeader;
            const payloadBase64 = token.split('.')[1];
            if (!payloadBase64) {
                return authHeader.includes('restaurant');
            }
            const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf8'));
            return payload.role === 'restaurant';
        }
        catch (error) {
            return authHeader.includes('restaurant');
        }
    }
    async createOrder(headers, createOrderDto) {
        console.log('Headers received:', headers);
        const authHeader = headers.authorization || headers.Authorization;
        console.log('Auth header found:', authHeader);
        const userId = this.getUserIdFromToken(authHeader);
        console.log('User ID extracted:', userId);
        return this.orderService.createOrder(userId, createOrderDto);
    }
    async getUserOrders(auth) {
        const userId = this.getUserIdFromToken(auth);
        return this.orderService.getUserOrders(userId);
    }
    async getAdminOrders(auth) {
        if (!this.isAdmin(auth) && !this.isRestaurant(auth)) {
            throw new common_1.UnauthorizedException('Only restaurant or admin can access all orders');
        }
        return this.orderService.getAdminOrders();
    }
    async getOrder(auth, orderId) {
        const userId = this.getUserIdFromToken(auth);
        const order = await this.orderService.getOrderById(userId, parseInt(orderId, 10));
        return {
            orderId: order.orderId,
            restaurantName: order.restaurantName,
            items: order.items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            })),
            deliveryFees: order.deliveryFees,
            serviceFees: order.serviceFees,
            totalAmount: order.totalAmount,
            status: order.status,
            timestamps: {
                createdAt: order.timestamps.createdAt,
                acceptedAt: order.timestamps.acceptedAt,
                deliveredAt: order.timestamps.deliveredAt
            }
        };
    }
    async cancelOrder(auth, orderId) {
        const userId = this.getUserIdFromToken(auth);
        return this.orderService.cancelOrder(userId, parseInt(orderId, 10));
    }
    async updateOrderStatus(auth, orderId, updateOrderStatusDto) {
        if (!this.isAdmin(auth) && !this.isRestaurant(auth)) {
            throw new common_1.UnauthorizedException('Only restaurant or admin can update order status');
        }
        return this.orderService.updateOrderStatus(parseInt(orderId, 10), updateOrderStatusDto.status);
    }
    async createOrderMessage(data) {
        return this.orderService.createOrder(data.userId, data.order);
    }
    async getUserOrdersMessage(userId) {
        return this.orderService.getUserOrders(userId);
    }
    async getOrderByIdMessage(data) {
        try {
            return await this.orderService.getOrderById(data.userId, data.orderId);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return null;
            }
            throw error;
        }
    }
    async cancelOrderMessage(data) {
        return this.orderService.cancelOrder(data.userId, data.orderId);
    }
    async updateOrderStatusMessage(data) {
        return this.orderService.updateOrderStatus(data.orderId, data.status);
    }
    async getAdminOrdersMessage() {
        return this.orderService.getAdminOrders();
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new order', description: 'Create a new order with the given items, delivery address, and payment method' }),
    (0, swagger_1.ApiHeader)({ name: 'authorization', description: 'Auth token (Bearer) - Use the Authorize button at the top for authentication', required: false }),
    (0, swagger_1.ApiBody)({ type: create_order_dto_1.CreateOrderDto, description: 'Order details including restaurant, items, delivery address, and payment method' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order created successfully', type: response_dto_1.OrderCreatedDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user orders', description: 'Retrieve order history for the authenticated user' }),
    (0, swagger_1.ApiHeader)({ name: 'authorization', description: 'Auth token (Bearer) - Use the Authorize button at the top for authentication', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user orders', type: [response_dto_1.OrderSummaryDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrders", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all orders (Admin/Restaurant)', description: 'Retrieve all orders for administration purposes. Reserved for restaurant owners and admins.' }),
    (0, swagger_1.ApiHeader)({ name: 'authorization', description: 'Auth token (Bearer with admin/restaurant role) - Use the Authorize button at the top for authentication', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all orders', type: [response_dto_1.AdminOrderSummaryDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - requires admin/restaurant role' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAdminOrders", null);
__decorate([
    (0, common_1.Get)(':orderId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order details', description: 'Retrieve detailed information about a specific order' }),
    (0, swagger_1.ApiParam)({ name: 'orderId', description: 'Order ID', example: '1245' }),
    (0, swagger_1.ApiHeader)({ name: 'authorization', description: 'Auth token (Bearer) - Use the Authorize button at the top for authentication', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order details', type: response_dto_1.OrderDetailDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - not your order' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Put)(':orderId/cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel an order', description: 'Cancel an order if it is in pending or accepted state' }),
    (0, swagger_1.ApiParam)({ name: 'orderId', description: 'Order ID to cancel', example: '1245' }),
    (0, swagger_1.ApiHeader)({ name: 'authorization', description: 'Auth token (Bearer) - Use the Authorize button at the top for authentication', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order canceled successfully', type: response_dto_1.MessageResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot cancel order in current state' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - not your order' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelOrder", null);
__decorate([
    (0, common_1.Patch)(':orderId/status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({ summary: 'Update order status', description: 'Update the status of an order. Reserved for restaurant owners and admins.' }),
    (0, swagger_1.ApiParam)({ name: 'orderId', description: 'Order ID to update', example: '1245' }),
    (0, swagger_1.ApiHeader)({ name: 'authorization', description: 'Auth token (Bearer with admin/restaurant role) - Use the Authorize button at the top for authentication', required: false }),
    (0, swagger_1.ApiBody)({ type: update_order_status_dto_1.UpdateOrderStatusDto, description: 'New status for the order' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order status updated', type: response_dto_1.MessageResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid status transition' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - requires admin/restaurant role' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('orderId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_order_status_dto_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_order' }),
    (0, swagger_1.ApiTags)('Microservice'),
    (0, swagger_1.ApiOperation)({ summary: 'Create order (microservice)', description: 'Internal microservice method for creating orders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrderMessage", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user_orders' }),
    (0, swagger_1.ApiTags)('Microservice'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user orders (microservice)', description: 'Internal microservice method for retrieving user orders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrdersMessage", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_order_by_id' }),
    (0, swagger_1.ApiTags)('Microservice'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order by ID (microservice)', description: 'Internal microservice method for retrieving an order by ID' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderByIdMessage", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'cancel_order' }),
    (0, swagger_1.ApiTags)('Microservice'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel order (microservice)', description: 'Internal microservice method for canceling an order' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelOrderMessage", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_order_status' }),
    (0, swagger_1.ApiTags)('Microservice'),
    (0, swagger_1.ApiOperation)({ summary: 'Update order status (microservice)', description: 'Internal microservice method for updating order status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderStatusMessage", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_admin_orders' }),
    (0, swagger_1.ApiTags)('Microservice'),
    (0, swagger_1.ApiOperation)({ summary: 'Get admin orders (microservice)', description: 'Internal microservice method for retrieving all orders for admin/restaurant' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAdminOrdersMessage", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map