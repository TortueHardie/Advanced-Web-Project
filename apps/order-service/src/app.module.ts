import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Prisma ORM module
    PrismaModule,
    // Microservices clients
    ClientsModule.register([
      {
        name: 'RESTAURANT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.RESTAURANT_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.RESTAURANT_SERVICE_PORT || '3001'),
        }
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PRODUCT_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.PRODUCT_SERVICE_PORT || '3002'),
        }
      }
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class AppModule {} 