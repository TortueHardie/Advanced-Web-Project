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
exports.OrderListResponseDto = exports.OrderResponseDto = exports.OrderItemResponseDto = exports.CreateOrderDto = exports.OrderItemDto = exports.PaymentMethod = exports.OrderStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["ACCEPTED"] = "ACCEPTED";
    OrderStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OrderStatus["READY"] = "READY";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELED"] = "CANCELED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CARD"] = "CARD";
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["PAYPAL"] = "PAYPAL";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
class OrderItemDto {
    articleId;
    quantity;
}
exports.OrderItemDto = OrderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de l\'article',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "articleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantité commandée',
        example: 2,
        minimum: 1
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "quantity", void 0);
class CreateOrderDto {
    restaurantId;
    items;
    deliveryAddress;
    paymentMethod;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID du restaurant',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "restaurantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Articles commandés',
        type: [OrderItemDto],
        example: [
            { articleId: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p', quantity: 2 },
            { articleId: '2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p', quantity: 1 }
        ]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Adresse de livraison',
        example: '123 Main St'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Méthode de paiement',
        enum: PaymentMethod,
        example: PaymentMethod.CARD
    }),
    (0, class_validator_1.IsEnum)(PaymentMethod),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "paymentMethod", void 0);
class OrderItemResponseDto {
    id;
    orderId;
    articleId;
    quantity;
    article;
}
exports.OrderItemResponseDto = OrderItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de l\'élément de commande',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
    }),
    __metadata("design:type", String)
], OrderItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la commande',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
    }),
    __metadata("design:type", String)
], OrderItemResponseDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de l\'article',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
    }),
    __metadata("design:type", String)
], OrderItemResponseDto.prototype, "articleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantité commandée',
        example: 2
    }),
    __metadata("design:type", Number)
], OrderItemResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Informations de l\'article',
        example: {
            id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
            name: 'Burger Classic',
            description: 'Burger avec steak, salade, tomate et sauce spéciale',
            price: 9.99,
            type: 'burger'
        }
    }),
    __metadata("design:type", Object)
], OrderItemResponseDto.prototype, "article", void 0);
class OrderResponseDto {
    id;
    userId;
    restaurantId;
    deliveryAddress;
    totalAmount;
    deliveryFees;
    serviceFees;
    status;
    paymentMethod;
    timestamps;
    orderItems;
    createdAt;
    restaurant;
}
exports.OrderResponseDto = OrderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la commande',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de l\'utilisateur',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID du restaurant',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "restaurantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Adresse de livraison',
        example: '123 Main St'
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Montant total',
        example: 19.99
    }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Frais de livraison',
        example: 2.99
    }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "deliveryFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Frais de service',
        example: 1.99
    }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "serviceFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Statut de la commande',
        enum: OrderStatus,
        example: OrderStatus.PENDING
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Méthode de paiement',
        enum: PaymentMethod,
        example: PaymentMethod.CARD
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Horodatages des changements de statut',
        example: {
            created: '2023-04-01T12:00:00.000Z',
            accepted: '2023-04-01T12:05:00.000Z',
            inProgress: null,
            ready: null,
            delivered: null
        }
    }),
    __metadata("design:type", Object)
], OrderResponseDto.prototype, "timestamps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Éléments de la commande',
        type: [OrderItemResponseDto]
    }),
    __metadata("design:type", Array)
], OrderResponseDto.prototype, "orderItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date de création',
        example: '2023-04-01T12:00:00.000Z'
    }),
    __metadata("design:type", Date)
], OrderResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Informations du restaurant',
        example: {
            id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
            name: 'Burger Palace',
            city: 'Paris',
            description: 'Les meilleurs burgers de la ville'
        }
    }),
    __metadata("design:type", Object)
], OrderResponseDto.prototype, "restaurant", void 0);
class OrderListResponseDto {
    orders;
    total;
}
exports.OrderListResponseDto = OrderListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Liste des commandes',
        type: [OrderResponseDto]
    }),
    __metadata("design:type", Array)
], OrderListResponseDto.prototype, "orders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre total de commandes',
        example: 10
    }),
    __metadata("design:type", Number)
], OrderListResponseDto.prototype, "total", void 0);
//# sourceMappingURL=order.dto.js.map