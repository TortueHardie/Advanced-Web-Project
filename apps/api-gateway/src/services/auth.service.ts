import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Vérifie si un token JWT est valide en faisant appel au service d'authentification
   * @param token Le token JWT à vérifier
   * @returns Un objet indiquant si le token est valide et les informations de l'utilisateur
   */
  async verifyToken(token: string): Promise<{ isValid: boolean; user?: any; error?: string }> {
    try {
      const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:3001';
      const response = await firstValueFrom(
        this.httpService.post(`${authServiceUrl}/auth/verify`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      
      return {
        isValid: true,
        user: response.data,
      };
    } catch (error) {
      const err = error as Error & { response?: { data?: any } };
      return {
        isValid: false,
        error: err.response?.data || 'Token invalide',
      };
    }
  }
} 