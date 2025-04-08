import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantNotFoundException extends HttpException {
  constructor(id?: string) {
    super(`Le restaurant ${id ? `avec l'ID ${id}` : ''} n'a pas été trouvé`, HttpStatus.NOT_FOUND);
  }
}

export class RestaurantAlreadyExistsException extends HttpException {
  constructor(name?: string) {
    super(`Un restaurant ${name ? `avec le nom "${name}"` : ''} existe déjà`, HttpStatus.CONFLICT);
  }
}

export class InvalidRestaurantDataException extends HttpException {
  constructor(message: string) {
    super(`Données de restaurant invalides: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class RestaurantOperationFailedException extends HttpException {
  constructor(operation?: string, error?: any) {
    const message = operation 
      ? (error ? `L'opération ${operation} a échoué: ${error.message}` : `L'opération ${operation} a échoué`)
      : 'Une opération liée au restaurant a échoué';
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
} 