import { HttpException, HttpStatus } from '@nestjs/common';

export class MenuNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Le menu avec l'ID ${id} n'a pas été trouvé`, HttpStatus.NOT_FOUND);
  }
}

export class MenuAlreadyExistsException extends HttpException {
  constructor(name: string, restaurantId: number) {
    super(
      `Un menu avec le nom "${name}" existe déjà dans ce restaurant (ID: ${restaurantId})`,
      HttpStatus.CONFLICT
    );
  }
}

export class InvalidMenuDataException extends HttpException {
  constructor(message: string) {
    super(`Données de menu invalides: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class MenuOperationFailedException extends HttpException {
  constructor(operation: string, error: any) {
    super(
      `L'opération ${operation} a échoué: ${error.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
} 