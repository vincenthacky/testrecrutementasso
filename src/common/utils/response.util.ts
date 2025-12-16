import {
  ApiResponse,
  PaginatedResponse,
} from '../interfaces/api-response.interface';

export class ResponseUtil {
  static responseError(message: string, code = 400): ApiResponse {
    return {
      success: false,
      status_code: code,
      message,
    };
  }

  static responseSuccessMessage(message: string, code = 200): ApiResponse {
    return {
      success: true,
      status_code: code,
      message,
    };
  }

  static responseSuccess<T>(
    data?: T,
    message = '',
    code = 200,
  ): ApiResponse<T> {
    return {
      success: true,
      status_code: code,
      message,
      data,
    };
  }

  static responseSuccessPaginate<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Données récupérées avec succès',
    code = 200,
  ): PaginatedResponse<T> {
    const lastPage = Math.ceil(total / limit);
    const from = total > 0 ? (page - 1) * limit + 1 : 0;
    const to = Math.min(page * limit, total);

    return {
      success: true,
      status_code: code,
      message,
      data,
      pagination: {
        total,
        per_page: limit,
        current_page: page,
        last_page: lastPage,
        from,
        to,
      },
    };
  }
}
