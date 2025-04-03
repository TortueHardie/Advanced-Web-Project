import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Capture l'heure de début de la requête
    const start = Date.now();
    
    // Stocke les informations originales
    const originalSend = res.send;
    
    // Override de la méthode send pour intercepter le statut
    res.send = function(body?: any): Response {
      // Récupère les informations de la requête
      const method = req.method;
      const path = req.originalUrl;
      const status = res.statusCode;
      const ip = req.ip || (req.headers['x-forwarded-for'] as string) || 'unknown';
      
      // Récupère le userId depuis le token JWT si disponible
      let userId = '';
      if (req.headers['user-id']) {
        userId = req.headers['user-id'] as string;
      }
      
      // Détermine le service en fonction de l'URL
      let service = 'UNKNOWN';
      if (path.startsWith('/auth')) {
        service = 'AUTH_SERVICE';
      } else if (path.startsWith('/user')) {
        service = 'USER_SERVICE';
      } else if (path.startsWith('/order')) {
        service = 'ORDER_SERVICE';
      }
      
      // Temps d'exécution en ms
      const responseTime = Date.now() - start;
      
      // Création de l'objet de log
      const logData = {
        timestamp: new Date(),
        method,
        path,
        status,
        ip,
        userId: userId || undefined,
        service,
        responseTime
      };
      
      // Envoi asynchrone des logs sans bloquer la réponse
      try {
        // Utiliser l'URL interne définie dans Nginx
        axios.post('http://localhost/log-write', logData, {
          headers: { 'Content-Type': 'application/json' }
        }).catch(error => {
          // Capture silencieuse des erreurs pour ne pas impacter l'utilisateur
          console.error('Erreur lors de l\'enregistrement du log:', error.message);
        });
      } catch (error) {
        // En cas d'erreur, on ne fait rien pour ne pas bloquer la réponse utilisateur
        console.error('Erreur inattendue lors de l\'enregistrement du log:', error);
      }
      
      // Appelle la méthode originale et retourne sa valeur
      return originalSend.call(this, body);
    };
    
    next();
  }
} 