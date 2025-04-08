import { Module } from '@nestjs/common';
import { DeliveryController } from './controllers/delivery.controller';
import { DeliveryService } from './services/delivery.service';
import { DeliveryRepository } from './repositories/delivery.repository';
import { PrismaModule } from '@advanced-web/prisma';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryRepository],
})
export class AppModule {} 