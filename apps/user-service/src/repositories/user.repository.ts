import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateLastLogin(id: string | number): Promise<User> {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return this.prisma.user.update({
      where: { id: numericId },
      data: {
        // Mettre à jour toute donnée nécessaire pour le dernier login
        // Par exemple, nous pourrions ajouter un champ lastLoginAt dans le schéma
        // Comme il n'existe pas dans le schéma actuel, nous ne mettons à jour aucun champ spécifique
      }
    });
  }
} 