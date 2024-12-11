export interface ApiResponse<T> extends ApiResponseBase {
  data: T;
}

export interface ApiResponseBase {
  success: boolean;
  error: boolean;
  message: string;
  data: any;
}
