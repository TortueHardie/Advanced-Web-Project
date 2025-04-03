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
exports.CreateOrderDto = exports.OrderItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class OrderItemDto {
}
exports.OrderItemDto = OrderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the product to order',
        example: 1,
        type: Number
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The quantity of the product',
        example: 2,
        type: Number,
        minimum: 1
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "quantity", void 0);
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the restaurant',
        example: 1,
        type: Number
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "restaurantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The list of items to order',
        type: [OrderItemDto],
        example: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The delivery address',
        example: '24 Le Paquebot',
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The payment method',
        example: 'card',
        type: String,
        enum: ['card', 'cash', 'paypal']
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "paymentMethod", void 0);
//# sourceMappingURL=create-order.dto.js.map