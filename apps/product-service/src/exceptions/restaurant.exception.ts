import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Le restaurant avec l'ID ${id} n'a pas été trouvé`, HttpStatus.NOT_FOUND);
  }
}

export class RestaurantAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(`Un restaurant avec le nom "${name}" existe déjà`, HttpStatus.CONFLICT);
  }
}

export class InvalidRestaurantDataException extends HttpException {
  constructor(message: string) {
    super(`Données de restaurant invalides: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class RestaurantOperationFailedException extends HttpException {
  constructor(operation: string, error: any) {
    super(
      `L'opération ${operation} a échoué: ${error.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
} 