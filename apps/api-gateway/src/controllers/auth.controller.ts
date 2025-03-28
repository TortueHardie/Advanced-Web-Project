import { Controller, Post, UseGuards, Request, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags, ApiOperation, ApiHeader, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth-verify')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Vérifie si le token JWT est valide' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT (format: Bearer [token])',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Token valide' })
  @ApiResponse({ status: 401, description: 'Token invalide ou expiré' })
  async verifyToken(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant ou format invalide');
    }

    const token = authHeader.substring(7); // Retirer "Bearer " du header
    const result = await this.authService.verifyToken(token);

    if (!result.isValid) {
      throw new UnauthorizedException(result.error);
    }

    return { isValid: true, user: result.user };
  }
} 