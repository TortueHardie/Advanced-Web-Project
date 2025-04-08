import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ArticleRepository } from '../repositories/article.repository';
import { ArticleDto, CreateArticleDto, UpdateArticleDto } from '../dto';
import { PrismaService } from '@advanced-web/prisma';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<ArticleDto> {
    // Vérifier que le restaurant existe
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: createArticleDto.restaurantId },
    });

    if (!restaurant) {
      throw new BadRequestException(`Le restaurant #${createArticleDto.restaurantId} n'existe pas`);
    }

    // Vérifier que le stock initial est cohérent avec la disponibilité
    if (createArticleDto.stock === 0 && createArticleDto.isAvailable) {
      throw new BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
    }

    return this.articleRepository.create(createArticleDto);
  }

  async findAll(): Promise<ArticleDto[]> {
    return this.articleRepository.findAll();
  }

  async findOne(id: string): Promise<ArticleDto> {
    const article = await this.articleRepository.findOne(id);
    if (!article) {
      throw new NotFoundException(`L'article #${id} n'existe pas`);
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<ArticleDto> {
    const article = await this.findOne(id);

    // Vérifier que le stock est cohérent avec la disponibilité
    if (updateArticleDto.stock !== undefined && updateArticleDto.isAvailable !== undefined) {
      if (updateArticleDto.stock === 0 && updateArticleDto.isAvailable) {
        throw new BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
      }
    } else if (updateArticleDto.stock !== undefined) {
      if (updateArticleDto.stock === 0 && article.isAvailable) {
        throw new BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
      }
    } else if (updateArticleDto.isAvailable !== undefined) {
      if (article.stock === 0 && updateArticleDto.isAvailable) {
        throw new BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
      }
    }

    return this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: string): Promise<ArticleDto> {
    const article = await this.findOne(id);

    // Vérifier si l'article est utilisé dans des menus
    const menus = await this.prisma.menu.findMany({
      where: {
        items: {
          some: {
            id: article.id
          }
        }
      }
    });

    if (menus.length > 0) {
      throw new BadRequestException(`L'article #${id} est utilisé dans ${menus.length} menu(x) et ne peut pas être supprimé`);
    }

    return this.articleRepository.remove(id);
  }

  async findByMenu(menuId: string): Promise<ArticleDto[]> {
    // Vérifier que le menu existe
    const menu = await this.prisma.menu.findUnique({
      where: { id: menuId },
    });

    if (!menu) {
      throw new NotFoundException(`Le menu #${menuId} n'existe pas`);
    }

    return this.articleRepository.findByMenu(menuId);
  }

  async updateStock(id: string, stock: number): Promise<ArticleDto> {
    const article = await this.findOne(id);

    // Vérifier que le stock est cohérent avec la disponibilité
    if (stock === 0 && article.isAvailable) {
      throw new BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
    }

    return this.articleRepository.updateStock(id, stock);
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<ArticleDto> {
    const article = await this.findOne(id);

    // Vérifier que la disponibilité est cohérente avec le stock
    if (article.stock === 0 && isAvailable) {
      throw new BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
    }

    return this.articleRepository.updateAvailability(id, isAvailable);
  }
} 