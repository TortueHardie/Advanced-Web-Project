import { Module } from '@nestjs/common';
import { DeliveryController } from './controllers/delivery.controller';
import { DeliveryService } from './services/delivery.service';
import { DeliveryRepository } from './repositories/delivery.repository';
import { PrismaModule } from '@advanced-web/prisma';
import { DiscoveryModule } from '@advanced-web/discovery';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    DiscoveryModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryRepository],
})
export class AppModule {} 