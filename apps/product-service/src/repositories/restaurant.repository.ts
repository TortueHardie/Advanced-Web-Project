import { Injectable } from '@nestjs/common';
import { PrismaService } from '@advanced-web/prisma';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../dto';

@Injectable()
export class RestaurantRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRestaurantDto) {
    return this.prisma.restaurant.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.restaurant.findMany({
      include: {
        menus: true,
        articles: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        menus: true,
        articles: true,
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.restaurant.findFirst({
      where: { name },
      include: {
        menus: true,
        articles: true,
      },
    });
  }

  async update(id: number, data: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }

  async findMenus(restaurantId: number) {
    return this.prisma.menu.findMany({
      where: { restaurantId },
      include: {
        items: true,
      },
    });
  }
} 