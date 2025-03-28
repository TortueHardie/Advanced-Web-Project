import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../packages/prisma/src/prisma.service';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<any> {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username: string): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<any> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateLastLogin(id: string): Promise<any> {
    return this.prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
} 