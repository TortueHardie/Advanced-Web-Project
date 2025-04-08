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
const restaurant_controller_1 = require("./controllers/restaurant.controller");
const menu_controller_1 = require("./controllers/menu.controller");
const article_controller_1 = require("./controllers/article.controller");
const restaurant_service_1 = require("./services/restaurant.service");
const menu_service_1 = require("./services/menu.service");
const article_service_1 = require("./services/article.service");
const restaurant_repository_1 = require("./repositories/restaurant.repository");
const menu_repository_1 = require("./repositories/menu.repository");
const article_repository_1 = require("./repositories/article.repository");
const prisma_service_1 = require("../../../packages/prisma/src/prisma.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [restaurant_controller_1.RestaurantController, menu_controller_1.MenuController, article_controller_1.ArticleController],
        providers: [
            restaurant_service_1.RestaurantService,
            menu_service_1.MenuService,
            article_service_1.ArticleService,
            restaurant_repository_1.RestaurantRepository,
            menu_repository_1.MenuRepository,
            article_repository_1.ArticleRepository,
            prisma_service_1.PrismaService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map