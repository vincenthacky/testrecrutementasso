export interface ApiResponse<T = any> {
  success: boolean;
  status_code: number;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  status_code: number;
  message: string;
  data: T[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
}
