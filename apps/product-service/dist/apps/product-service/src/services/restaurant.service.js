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
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const restaurant_repository_1 = require("../repositories/restaurant.repository");
let RestaurantService = class RestaurantService {
    restaurantRepository;
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    async create(createRestaurantDto) {
        return this.restaurantRepository.create(createRestaurantDto);
    }
    async findAll() {
        return this.restaurantRepository.findAll();
    }
    async findOne(id) {
        const restaurant = await this.restaurantRepository.findOne(id);
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurant with ID ${id} not found`);
        }
        return restaurant;
    }
    async update(id, updateRestaurantDto) {
        await this.findOne(id);
        return this.restaurantRepository.update(id, updateRestaurantDto);
    }
    async remove(id) {
        await this.findOne(id);
        return this.restaurantRepository.remove(id);
    }
    async findMenus(restaurantId) {
        await this.findOne(restaurantId);
        return this.restaurantRepository.findMenus(restaurantId);
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [restaurant_repository_1.RestaurantRepository])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map