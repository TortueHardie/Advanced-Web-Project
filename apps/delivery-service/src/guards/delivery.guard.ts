import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DeliveryGuard implements CanActivate {
  private readonly authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:3001';

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant ou format invalide');
    }

    const token = authHeader.substring(7);

    try {
      const response = await axios.post(`${this.authServiceUrl}/auth/verify`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Stocker les informations utilisateur dans la requête
      request.user = response.data;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
} 