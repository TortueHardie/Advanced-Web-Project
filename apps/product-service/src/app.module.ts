import { Module } from '@nestjs/common';
import { RestaurantController } from './controllers/restaurant.controller';
import { MenuController } from './controllers/menu.controller';
import { ArticleController } from './controllers/article.controller';
import { RestaurantService } from './services/restaurant.service';
import { MenuService } from './services/menu.service';
import { ArticleService } from './services/article.service';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { MenuRepository } from './repositories/menu.repository';
import { ArticleRepository } from './repositories/article.repository';
import { PrismaService } from '../../../packages/prisma/src/prisma.service';

@Module({
  imports: [],
  controllers: [RestaurantController, MenuController, ArticleController],
  providers: [
    RestaurantService,
    MenuService,
    ArticleService,
    RestaurantRepository,
    MenuRepository,
    ArticleRepository,
    PrismaService,
  ],
})
export class AppModule {} 