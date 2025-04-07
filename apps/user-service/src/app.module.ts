import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class AppModule {}
