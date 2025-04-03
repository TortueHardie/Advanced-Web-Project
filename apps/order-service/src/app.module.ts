import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService, OrderRepository],
})
export class AppModule {} 