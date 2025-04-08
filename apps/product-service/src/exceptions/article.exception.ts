import { HttpException, HttpStatus } from '@nestjs/common';

export class ArticleNotFoundException extends HttpException {
  constructor(id: number) {
    super(`L'article avec l'ID ${id} n'a pas été trouvé`, HttpStatus.NOT_FOUND);
  }
}

export class ArticleAlreadyExistsException extends HttpException {
  constructor(name: string, menuId: number) {
    super(
      `Un article avec le nom "${name}" existe déjà dans ce menu (ID: ${menuId})`,
      HttpStatus.CONFLICT
    );
  }
}

export class InvalidArticleDataException extends HttpException {
  constructor(message: string) {
    super(`Données d'article invalides: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class ArticleOperationFailedException extends HttpException {
  constructor(operation: string, error: any) {
    super(
      `L'opération ${operation} a échoué: ${error.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
} 