import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = exception.message;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const responseObj = exceptionResponse as Record<string, unknown>;
      if (responseObj.message) {
        message = Array.isArray(responseObj.message)
          ? (responseObj.message as string[]).join(', ')
          : (responseObj.message as string);
      }
    }

    const errorResponse = {
      success: false,
      status_code: status,
      message: this.translateErrorMessage(message, status),
    };

    response.status(status).json(errorResponse);
  }

  private translateErrorMessage(message: string, status: number): string {
    const translations: Record<string, string> = {
      'Bad Request': 'Requête invalide',
      Unauthorized: 'Non autorisé',
      Forbidden: 'Accès interdit',
      'Not Found': 'Ressource non trouvée',
      Conflict: 'Conflit de données',
      'Internal Server Error': 'Erreur interne du serveur',
      'Validation failed': 'Échec de la validation',
    };

    // Chercher une traduction exacte
    if (translations[message]) {
      return translations[message];
    }

    // Traduire les messages de validation
    if (message.includes('Validation échouée')) {
      return message;
    }

    // Messages par défaut selon le status
    switch (status) {
      case 400:
        return 'Données fournies invalides';
      case 401:
        return 'Authentification requise';
      case 403:
        return 'Accès refusé';
      case 404:
        return 'Ressource non trouvée';
      case 409:
        return 'Conflit - données déjà existantes';
      case 500:
        return 'Erreur interne du serveur';
      default:
        return message;
    }
  }
}
