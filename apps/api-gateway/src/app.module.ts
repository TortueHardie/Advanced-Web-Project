import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { OrderController } from './controllers/order.controller';
import { GlobalExceptionFilter } from '../../../packages/common/src/error-handling/http-exception.filter';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, AuthController, UserController, OrderController],
  providers: [
    AppService, 
    AuthService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    }
  ],
})
export class AppModule {}
