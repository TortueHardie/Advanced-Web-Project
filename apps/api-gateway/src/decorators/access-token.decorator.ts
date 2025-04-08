import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Décorateur personnalisé qui extrait le header 'Authorization' sans l'exposer dans Swagger
 * @example
 * @Get('profile')
 * async getProfile(@AccessToken() token: string) {
 *   // Utiliser le token
 * }
 */
export const AccessToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    // Retourne le header d'autorisation complet (avec "Bearer ")
    return authHeader;
  },
); 