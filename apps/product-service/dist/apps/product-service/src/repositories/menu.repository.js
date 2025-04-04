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
exports.MenuRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("@advanced-web/prisma");
let MenuRepository = class MenuRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { itemIds, ...menuData } = data;
        return this.prisma.menu.create({
            data: {
                ...menuData,
                items: {
                    connect: itemIds.map(id => ({ id })),
                },
            },
            include: {
                items: true,
            },
        });
    }
    async findAll() {
        return this.prisma.menu.findMany({
            include: {
                items: true,
            },
        });
    }
    async findOne(id) {
        return this.prisma.menu.findUnique({
            where: { id },
            include: {
                items: true,
            },
        });
    }
    async update(id, data) {
        const { itemIds, ...menuData } = data;
        return this.prisma.menu.update({
            where: { id },
            data: {
                ...menuData,
                ...(itemIds && {
                    items: {
                        set: itemIds.map(id => ({ id })),
                    },
                }),
            },
            include: {
                items: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.menu.delete({
            where: { id },
            include: {
                items: true,
            },
        });
    }
    async findByRestaurant(restaurantId) {
        return this.prisma.menu.findMany({
            where: { restaurantId },
            include: {
                items: true,
            },
        });
    }
};
exports.MenuRepository = MenuRepository;
exports.MenuRepository = MenuRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], MenuRepository);
//# sourceMappingURL=menu.repository.js.map