"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const core_1 = require("@nestjs/core");
const common_2 = require("@nestjs/common");
const user_controller_1 = require("./controllers/user.controller");
const auth_controller_1 = require("./controllers/auth.controller");
const order_controller_1 = require("./controllers/order.controller");
const product_controller_1 = require("./controllers/product.controller");
const delivery_controller_1 = require("./controllers/delivery.controller");
const http_exception_filter_1 = require("../../../packages/common/src/error-handling/http-exception.filter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            axios_1.HttpModule,
        ],
        controllers: [
            auth_controller_1.AuthController,
            user_controller_1.UserController,
            order_controller_1.OrderController,
            product_controller_1.ProductController,
            delivery_controller_1.DeliveryController
        ],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useClass: common_2.ValidationPipe,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.GlobalExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map