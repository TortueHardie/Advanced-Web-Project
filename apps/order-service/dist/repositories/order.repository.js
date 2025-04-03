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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const update_order_status_dto_1 = require("../dto/update-order-status.dto");
let OrderRepository = class OrderRepository {
    constructor() { }
    async createOrder(userId, createOrderDto, totalAmount) {
        const orderId = Math.floor(Math.random() * 10000);
        const now = new Date();
        return {
            orderId,
            userId,
            restaurantId: createOrderDto.restaurantId,
            restaurantName: 'Restaurant Name',
            items: createOrderDto.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                name: `Product ${item.productId}`,
                unitPrice: 0,
            })),
            deliveryAddress: createOrderDto.deliveryAddress,
            paymentMethod: createOrderDto.paymentMethod,
            status: update_order_status_dto_1.OrderStatus.PENDING,
            totalAmount,
            deliveryFees: 2.0,
            serviceFees: totalAmount * 0.3,
            timestamps: {
                createdAt: now,
            },
        };
    }
    async getUserOrders(userId) {
        return [
            {
                orderId: 1245,
                userId,
                restaurantId: 1,
                restaurantName: 'GoMiam',
                items: [],
                deliveryAddress: '24 Le Paquebot',
                paymentMethod: 'card',
                status: update_order_status_dto_1.OrderStatus.IN_PROGRESS,
                totalAmount: 23.0,
                deliveryFees: 2.0,
                serviceFees: 6.0,
                timestamps: {
                    createdAt: new Date('2025-03-21T08:23:24Z'),
                },
            },
        ];
    }
    async getOrderById(orderId) {
        if (orderId === 1245) {
            return {
                orderId: 1245,
                userId: 1,
                restaurantId: 1,
                restaurantName: 'GoMiam',
                items: [
                    { productId: 1, quantity: 2, name: 'Kebab', unitPrice: 7.5 },
                    { productId: 2, quantity: 1, name: 'Cola', unitPrice: 2.0 },
                ],
                deliveryAddress: '24 Le Paquebot',
                paymentMethod: 'card',
                status: update_order_status_dto_1.OrderStatus.ACCEPTED,
                totalAmount: 23.0,
                deliveryFees: 2.0,
                serviceFees: 6.0,
                timestamps: {
                    createdAt: new Date('2025-03-21T08:23:24Z'),
                    acceptedAt: new Date('2025-03-21T08:25:00Z'),
                },
            };
        }
        return null;
    }
    async cancelOrder(orderId) {
        return true;
    }
    async updateOrderStatus(orderId, status) {
        return true;
    }
    async getAdminOrders() {
        return [
            {
                orderId: 1245,
                userId: 1,
                restaurantId: 1,
                restaurantName: 'GoMiam',
                items: [],
                deliveryAddress: '24 Le Paquebot',
                paymentMethod: 'card',
                status: update_order_status_dto_1.OrderStatus.IN_PROGRESS,
                totalAmount: 23.0,
                deliveryFees: 2.0,
                serviceFees: 6.0,
                timestamps: {
                    createdAt: new Date('2025-03-21T08:23:24Z'),
                },
            },
        ];
    }
    getTimestampFieldForStatus(status) {
        const statusToTimestampMap = {
            [update_order_status_dto_1.OrderStatus.ACCEPTED]: 'acceptedAt',
            [update_order_status_dto_1.OrderStatus.IN_PROGRESS]: 'inProgressAt',
            [update_order_status_dto_1.OrderStatus.READY]: 'readyAt',
            [update_order_status_dto_1.OrderStatus.DELIVERED]: 'deliveredAt',
            [update_order_status_dto_1.OrderStatus.CANCELED]: 'canceledAt',
        };
        return statusToTimestampMap[status] || null;
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OrderRepository);
//# sourceMappingURL=order.repository.js.map