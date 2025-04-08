import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DeliveryGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Pour l'instant, autoriser toutes les requêtes pour test
    console.log('DeliveryGuard: bypassing authentication for testing...');
    
    const request = context.switchToHttp().getRequest();
    
    // Configurer un utilisateur de test
    request.user = {
      id: 'test-user-id',
      role: 'DELIVERY_PERSON',
    };
    
    return true;
  }
} 