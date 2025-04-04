import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from '../repositories/article.repository';
import { CreateArticleDto, UpdateArticleDto, ArticleDto } from '../dto';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async create(createArticleDto: CreateArticleDto): Promise<ArticleDto> {
    return this.articleRepository.create(createArticleDto);
  }

  async findAll(restaurantId: number): Promise<ArticleDto[]> {
    return this.articleRepository.findAll(restaurantId);
  }

  async findOne(id: number): Promise<ArticleDto> {
    const article = await this.articleRepository.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<ArticleDto> {
    await this.findOne(id);
    return this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: number): Promise<ArticleDto> {
    await this.findOne(id);
    return this.articleRepository.remove(id);
  }

  async updateStock(id: number, stock: number): Promise<ArticleDto> {
    await this.findOne(id);
    return this.articleRepository.updateStock(id, stock);
  }

  async updateAvailability(id: number, isAvailable: boolean): Promise<ArticleDto> {
    await this.findOne(id);
    return this.articleRepository.updateAvailability(id, isAvailable);
  }
} 