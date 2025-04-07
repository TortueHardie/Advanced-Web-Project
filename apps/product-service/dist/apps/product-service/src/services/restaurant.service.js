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
        try {
            const restaurant = await this.restaurantRepository.create(createRestaurantDto);
            return this.mapToDto(restaurant);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create restaurant', error);
        }
    }
    async findAll() {
        const restaurants = await this.restaurantRepository.findAll();
        return restaurants.map(restaurant => this.mapToDto(restaurant));
    }
    async findOne(id) {
        const restaurant = await this.restaurantRepository.findOne(id);
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurant with ID ${id} not found`);
        }
        return this.mapToDto(restaurant);
    }
    async update(id, updateRestaurantDto) {
        await this.findOne(id);
        const restaurant = await this.restaurantRepository.update(id, updateRestaurantDto);
        return this.mapToDto(restaurant);
    }
    async remove(id) {
        await this.findOne(id);
        const restaurant = await this.restaurantRepository.remove(id);
        return this.mapToDto(restaurant);
    }
    async findMenus(restaurantId) {
        await this.findOne(restaurantId);
        const menus = await this.restaurantRepository.findMenus(restaurantId);
        return menus.map(menu => ({
            ...menu,
            isAvailable: true
        }));
    }
    mapToDto(restaurant) {
        return {
            id: restaurant.id,
            name: restaurant.name,
            description: restaurant.description,
            city: restaurant.city,
            deliveryFees: restaurant.deliveryFees,
            status: restaurant.status,
            ownerId: restaurant.ownerId,
            menus: restaurant.menus,
            articles: restaurant.articles
        };
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [restaurant_repository_1.RestaurantRepository])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map