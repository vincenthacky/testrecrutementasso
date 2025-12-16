import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown): unknown => {
        if (
          data &&
          typeof data === 'object' &&
          data !== null &&
          'success' in data
        ) {
          return data;
        }

        const response = context.switchToHttp().getResponse<Response>();

        return {
          success: true,
          status_code: response.statusCode,
          message: 'Opération réussie',
          data,
        } satisfies ApiResponse;
      }),
    );
  }
}
