import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Structure standardisée pour les réponses d'erreur
 */
export interface ErrorResponse {
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
  details?: any;
}

/**
 * Filtre d'exception global pour standardiser les réponses d'erreur HTTP
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    // Déterminer le statut HTTP et le message
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erreur interne du serveur';
    let details = undefined;
    
    // Si c'est une exception HTTP connue
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      // Extraire le message et les détails de l'exception
      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exception.message;
        details = (exceptionResponse as any).details;
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      // Pour les erreurs génériques
      message = exception.message;
      
      // En production, ne pas exposer les détails des erreurs internes
      if (process.env.NODE_ENV === 'production') {
        message = 'Erreur interne du serveur';
      }
    }
    
    // Journalisation de l'erreur
    console.error(`[${new Date().toISOString()}] ${status} - ${message}`, {
      path: request.url,
      method: request.method,
      ...(details ? { details } : {}),
      stack: exception instanceof Error ? exception.stack : undefined,
    });
    
    // Construction de la réponse d'erreur
    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };
    
    // Ajouter les détails si présents
    if (details) {
      errorResponse.details = details;
    }
    
    // Envoi de la réponse
    response.status(status).json(errorResponse);
  }
} 