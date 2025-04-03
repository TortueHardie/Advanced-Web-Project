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
exports.AdminOrderSummaryDto = exports.MessageResponseDto = exports.OrderCreatedDto = exports.OrderDetailDto = exports.OrderTimestampsDto = exports.OrderItemResponseDto = exports.OrderSummaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const update_order_status_dto_1 = require("./update-order-status.dto");
class OrderSummaryDto {
}
exports.OrderSummaryDto = OrderSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the order',
        example: 1245
    }),
    __metadata("design:type", Number)
], OrderSummaryDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the restaurant',
        example: 'GoMiam'
    }),
    __metadata("design:type", String)
], OrderSummaryDto.prototype, "restaurantName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date and time when the order was created',
        example: '2025-03-21T08:23:24Z'
    }),
    __metadata("design:type", Date)
], OrderSummaryDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current status of the order',
        example: 'in_progress',
        enum: update_order_status_dto_1.OrderStatus
    }),
    __metadata("design:type", String)
], OrderSummaryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total amount of the order',
        example: 23.00
    }),
    __metadata("design:type", Number)
], OrderSummaryDto.prototype, "totalAmount", void 0);
class OrderItemResponseDto {
}
exports.OrderItemResponseDto = OrderItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the ordered product',
        example: 'Kebab'
    }),
    __metadata("design:type", String)
], OrderItemResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity ordered',
        example: 2
    }),
    __metadata("design:type", Number)
], OrderItemResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unit price of the product',
        example: 7.50
    }),
    __metadata("design:type", Number)
], OrderItemResponseDto.prototype, "unitPrice", void 0);
class OrderTimestampsDto {
}
exports.OrderTimestampsDto = OrderTimestampsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date and time when the order was created',
        example: '2025-03-21T08:23:24Z'
    }),
    __metadata("design:type", Date)
], OrderTimestampsDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date and time when the order was accepted by the restaurant',
        example: '2025-03-21T08:25:00Z',
        nullable: true
    }),
    __metadata("design:type", Date)
], OrderTimestampsDto.prototype, "acceptedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date and time when the order was delivered',
        example: null,
        nullable: true
    }),
    __metadata("design:type", Date)
], OrderTimestampsDto.prototype, "deliveredAt", void 0);
class OrderDetailDto {
}
exports.OrderDetailDto = OrderDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the order',
        example: 1245
    }),
    __metadata("design:type", Number)
], OrderDetailDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the restaurant',
        example: 'GoMiam'
    }),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "restaurantName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of items in the order',
        type: [OrderItemResponseDto]
    }),
    __metadata("design:type", Array)
], OrderDetailDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Delivery fees',
        example: 2.00
    }),
    __metadata("design:type", Number)
], OrderDetailDto.prototype, "deliveryFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Service fees (30%)',
        example: 6.00
    }),
    __metadata("design:type", Number)
], OrderDetailDto.prototype, "serviceFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total amount',
        example: 23.00
    }),
    __metadata("design:type", Number)
], OrderDetailDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current status of the order',
        example: 'accepted',
        enum: update_order_status_dto_1.OrderStatus
    }),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Order timestamps for different status transitions',
        type: OrderTimestampsDto
    }),
    __metadata("design:type", OrderTimestampsDto)
], OrderDetailDto.prototype, "timestamps", void 0);
class OrderCreatedDto {
}
exports.OrderCreatedDto = OrderCreatedDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the created order',
        example: 1245
    }),
    __metadata("design:type", Number)
], OrderCreatedDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Initial status of the order',
        example: 'pending',
        enum: [update_order_status_dto_1.OrderStatus.PENDING]
    }),
    __metadata("design:type", String)
], OrderCreatedDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total amount for the order',
        example: 23.00
    }),
    __metadata("design:type", Number)
], OrderCreatedDto.prototype, "totalAmount", void 0);
class MessageResponseDto {
}
exports.MessageResponseDto = MessageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Response message',
        example: 'Order status updated'
    }),
    __metadata("design:type", String)
], MessageResponseDto.prototype, "message", void 0);
class AdminOrderSummaryDto extends OrderSummaryDto {
}
exports.AdminOrderSummaryDto = AdminOrderSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID who placed the order',
        example: 1
    }),
    __metadata("design:type", Number)
], AdminOrderSummaryDto.prototype, "userId", void 0);
//# sourceMappingURL=response.dto.js.map