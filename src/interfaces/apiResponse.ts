interface SuccessResponse<T> {
  status: number;
  data: T;
}

interface ErrorResponse {
  status: number;
  error: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export default ApiResponse;
