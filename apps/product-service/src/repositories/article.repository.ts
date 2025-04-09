import { Injectable } from '@nestjs/common';
import { PrismaService } from '@advanced-web/prisma';
import { CreateArticleDto, UpdateArticleDto } from '../dto';

@Injectable()
export class ArticleRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateArticleDto) {
    return this.prisma.article.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.article.findMany();
  }

  async findOne(id: number) {
    return this.prisma.article.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.article.delete({
      where: { id },
    });
  }

  async findByMenu(menuId: number) {
    return this.prisma.article.findMany({
      where: {
        menus: {
          some: {
            id: menuId
          }
        }
      },
    });
  }

  async updateStock(id: number, stock: number) {
    return this.prisma.article.update({
      where: { id },
      data: { stock },
    });
  }

  async updateAvailability(id: number, isAvailable: boolean) {
    return this.prisma.article.update({
      where: { id },
      data: { isAvailable },
    });
  }
} 