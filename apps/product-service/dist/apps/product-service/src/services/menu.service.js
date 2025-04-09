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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const menu_repository_1 = require("../repositories/menu.repository");
let MenuService = class MenuService {
    menuRepository;
    constructor(menuRepository) {
        this.menuRepository = menuRepository;
    }
    async create(createMenuDto) {
        const menu = await this.menuRepository.create(createMenuDto);
        return this.mapToDto(menu);
    }
    async findAll(restaurantId) {
        let menus;
        if (restaurantId) {
            menus = await this.menuRepository.findByRestaurant(restaurantId);
        }
        else {
            menus = await this.menuRepository.findAll();
        }
        return menus.map(menu => this.mapToDto(menu));
    }
    async findOne(id) {
        const menu = await this.menuRepository.findOne(id);
        if (!menu) {
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
        return this.mapToDto(menu);
    }
    async update(id, updateMenuDto) {
        await this.findOne(id);
        const menu = await this.menuRepository.update(id, updateMenuDto);
        return this.mapToDto(menu);
    }
    async remove(id) {
        await this.findOne(id);
        const menu = await this.menuRepository.remove(id);
        return this.mapToDto(menu);
    }
    async updateAvailability(id, isAvailable) {
        await this.findOne(id);
        const menu = await this.menuRepository.update(id, { isAvailable });
        return this.mapToDto(menu);
    }
    mapToDto(menu) {
        return {
            ...menu,
            isAvailable: menu.isAvailable ?? true
        };
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [menu_repository_1.MenuRepository])
], MenuService);
//# sourceMappingURL=menu.service.js.map