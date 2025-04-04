import { Injectable } from '@nestjs/common';
import { PrismaService } from '@advanced-web/prisma/src/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from '../dto';

@Injectable()
export class MenuRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMenuDto) {
    const { articleIds, ...menuData } = data;
    return this.prisma.menu.create({
      data: {
        ...menuData,
        items: {
          connect: articleIds.map(id => ({ id })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findAll(restaurantId: number) {
    return this.prisma.menu.findMany({
      where: { restaurantId },
      include: {
        items: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  async update(id: number, data: UpdateMenuDto) {
    const { articleIds, ...menuData } = data;
    return this.prisma.menu.update({
      where: { id },
      data: {
        ...menuData,
        items: articleIds ? {
          set: articleIds.map(id => ({ id })),
        } : undefined,
      },
      include: {
        items: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }

  async updateAvailability(id: number, isAvailable: boolean) {
    return this.prisma.menu.update({
      where: { id },
      data: { isAvailable },
    });
  }
} 