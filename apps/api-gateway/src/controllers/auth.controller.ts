import { Controller, Post, Get, Headers, UnauthorizedException, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LoginDto, RegisterDto, RefreshTokenDto, TokenResponseDto } from '../dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:3001';

  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService
  ) {}

  private async forwardRequest(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', authHeader?: string, body?: any) {
    const headers: Record<string, string> = {};
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    try {
      let response;
      const url = `${this.authServiceUrl}/auth/${path}`;
      
      switch (method) {
        case 'GET':
          response = await firstValueFrom(
            this.httpService.get(url, { headers })
          );
          break;
        case 'POST':
          response = await firstValueFrom(
            this.httpService.post(url, body, { headers })
          );
          break;
        case 'PUT':
          response = await firstValueFrom(
            this.httpService.put(url, body, { headers })
          );
          break;
        case 'DELETE':
          response = await firstValueFrom(
            this.httpService.delete(url, { headers })
          );
          break;
      }
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new UnauthorizedException(error.response?.data?.message || 'Non autorisé');
      }
      throw error;
    }
  }

  @Post('verify')
  @ApiOperation({ summary: 'Vérifie si le token JWT est valide' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Token valide', type: Object })
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

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Connexion réussie, tokens retournés',
    type: TokenResponseDto 
  })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async login(@Body() loginDto: LoginDto) {
    return this.forwardRequest('login', 'POST', undefined, loginDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Inscription utilisateur' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Inscription réussie, tokens retournés',
    type: TokenResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  async register(@Body() registerDto: RegisterDto) {
    // Transmettre directement les données au service d'authentification
    return this.forwardRequest('register', 'POST', undefined, registerDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rafraîchir les tokens' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Tokens rafraîchis avec succès',
    type: TokenResponseDto 
  })
  @ApiResponse({ status: 401, description: 'Token de rafraîchissement invalide' })
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    return this.forwardRequest('refresh', 'POST', undefined, refreshDto);
  }

  @Post('revoke')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Révoquer un token' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Token révoqué avec succès' })
  @ApiResponse({ status: 401, description: 'Token invalide' })
  async revoke(@Headers('authorization') authHeader: string) {
    return this.forwardRequest('revoke', 'POST', authHeader);
  }
} 