import { Injectable } from '@nestjs/common';
import { PrismaService } from '@advanced-web/prisma';
import { CreateMenuDto, UpdateMenuDto } from '../dto';

@Injectable()
export class MenuRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMenuDto) {
    const { itemIds, ...menuData } = data;
    return this.prisma.menu.create({
      data: {
        ...menuData,
        items: {
          connect: itemIds.map(id => ({ id: String(id) })),
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

  async findOne(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  async update(id: string, data: UpdateMenuDto) {
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

  async remove(id: string) {
    return this.prisma.menu.delete({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  async findByRestaurant(restaurantId: string) {
    return this.prisma.menu.findMany({
      where: { restaurantId },
      include: {
        items: true,
      },
    });
  }
} 