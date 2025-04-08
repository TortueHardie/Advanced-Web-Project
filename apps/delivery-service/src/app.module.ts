import { Module } from '@nestjs/common';
import { PrismaModule } from '@advanced-web/prisma';
import { DiscoveryModule } from '@advanced-web/discovery';
import { DeliveryController } from './controllers/delivery.controller';
import { DeliveryService } from './services/delivery.service';
import { DeliveryRepository } from './repositories/delivery.repository';

@Module({
  imports: [
    PrismaModule,
    DiscoveryModule,
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryRepository],
})
export class AppModule {} 