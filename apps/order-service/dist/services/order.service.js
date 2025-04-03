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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_1 = require("../repositories/order.repository");
const update_order_status_dto_1 = require("../dto/update-order-status.dto");
let OrderService = class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async createOrder(userId, createOrderDto) {
        const mockUnitPrice = 7.50;
        const subtotal = createOrderDto.items.reduce((total, item) => {
            return total + (mockUnitPrice * item.quantity);
        }, 0);
        const deliveryFee = 2.0;
        const serviceFee = subtotal * 0.3;
        const totalAmount = subtotal + deliveryFee + serviceFee;
        const order = await this.orderRepository.createOrder(userId, createOrderDto, totalAmount);
        return {
            orderId: order.orderId,
            status: order.status,
            totalAmount: order.totalAmount,
        };
    }
    async getUserOrders(userId) {
        const orders = await this.orderRepository.getUserOrders(userId);
        return orders.map((order) => ({
            orderId: order.orderId,
            restaurantName: order.restaurantName,
            createdAt: order.timestamps.createdAt,
            status: order.status,
            totalAmount: order.totalAmount,
        }));
    }
    async getOrderById(userId, orderId) {
        const order = await this.orderRepository.getOrderById(orderId);
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        if (order.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to access this order');
        }
        return order;
    }
    async cancelOrder(userId, orderId) {
        const order = await this.orderRepository.getOrderById(orderId);
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        if (order.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to cancel this order');
        }
        if (![update_order_status_dto_1.OrderStatus.PENDING, update_order_status_dto_1.OrderStatus.ACCEPTED].includes(order.status)) {
            throw new common_1.BadRequestException('Order cannot be canceled in its current state');
        }
        const success = await this.orderRepository.cancelOrder(orderId);
        if (!success) {
            throw new common_1.BadRequestException('Failed to cancel order');
        }
        return { message: 'Order canceled successfully' };
    }
    async updateOrderStatus(orderId, status) {
        const order = await this.orderRepository.getOrderById(orderId);
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        this.validateStatusTransition(order.status, status);
        const success = await this.orderRepository.updateOrderStatus(orderId, status);
        if (!success) {
            throw new common_1.BadRequestException('Failed to update order status');
        }
        return { message: 'Order status updated' };
    }
    async getAdminOrders() {
        const orders = await this.orderRepository.getAdminOrders();
        return orders.map((order) => ({
            orderId: order.orderId,
            userId: order.userId,
            restaurantName: order.restaurantName,
            createdAt: order.timestamps.createdAt,
            status: order.status,
            totalAmount: order.totalAmount,
        }));
    }
    validateStatusTransition(currentStatus, newStatus) {
        const validTransitions = {
            [update_order_status_dto_1.OrderStatus.PENDING]: [update_order_status_dto_1.OrderStatus.ACCEPTED, update_order_status_dto_1.OrderStatus.CANCELED],
            [update_order_status_dto_1.OrderStatus.ACCEPTED]: [update_order_status_dto_1.OrderStatus.IN_PROGRESS, update_order_status_dto_1.OrderStatus.CANCELED],
            [update_order_status_dto_1.OrderStatus.IN_PROGRESS]: [update_order_status_dto_1.OrderStatus.READY],
            [update_order_status_dto_1.OrderStatus.READY]: [update_order_status_dto_1.OrderStatus.DELIVERED],
            [update_order_status_dto_1.OrderStatus.DELIVERED]: [],
            [update_order_status_dto_1.OrderStatus.CANCELED]: [],
        };
        if (!validTransitions[currentStatus].includes(newStatus)) {
            throw new common_1.BadRequestException(`Invalid status transition from ${currentStatus} to ${newStatus}`);
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository])
], OrderService);
//# sourceMappingURL=order.service.js.map