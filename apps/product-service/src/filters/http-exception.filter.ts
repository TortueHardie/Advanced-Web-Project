import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ValidationError } from 'class-validator';
import { Logger } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Une erreur inattendue s\'est produite';
    let error = 'Internal Server Error';
    let details: Record<string, unknown> | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as any;
        
        // Gestion des erreurs de validation
        if (Array.isArray(responseObj.message) && responseObj.message[0] instanceof ValidationError) {
          const validationErrors = responseObj.message as ValidationError[];
          message = 'Erreur de validation des données';
          error = 'Validation Error';
          details = this.formatValidationErrors(validationErrors);
        } else {
          message = responseObj.message || exception.message;
          error = responseObj.error || 'Error';
          details = responseObj.details || null;
        }
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Un enregistrement avec cette valeur unique existe déjà';
          details = exception.meta || null;
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Enregistrement non trouvé';
          details = exception.meta || null;
          break;
        default:
          message = `Erreur de base de données: ${exception.message}`;
          details = {
            code: exception.code,
            meta: exception.meta || null
          };
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Données invalides';
      details = { message: exception.message };
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
      error: error,
      details: details
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : 'Unknown error',
        'HttpExceptionFilter'
      );
    } else {
      this.logger.warn(
        `${request.method} ${request.url} - Status ${status} - ${message}`
      );
    }

    response
      .status(status)
      .json(errorResponse);
  }

  private formatValidationErrors(errors: ValidationError[]): Record<string, string[]> {
    const formattedErrors: Record<string, string[]> = {};
    
    errors.forEach(error => {
      if (error.constraints) {
        formattedErrors[error.property] = Object.values(error.constraints);
      }
      if (error.children && error.children.length > 0) {
        const childErrors = this.formatValidationErrors(error.children);
        Object.assign(formattedErrors, childErrors);
      }
    });

    return formattedErrors;
  }
} 