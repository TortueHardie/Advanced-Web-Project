import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';
import { DeliveryController } from './controllers/delivery.controller';
import { GlobalExceptionFilter } from '../../../packages/common/src/error-handling/http-exception.filter';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [
    AuthController, 
    UserController, 
    OrderController, 
    ProductController, 
    DeliveryController
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AuthService,
  ],
})
export class AppModule {}
