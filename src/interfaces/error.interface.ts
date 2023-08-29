export interface CustomException extends Error {
  name: string;
  code?: number;
  statusCode?: number;
  status?: 'failure' | 'error';
  message: string;
  isOperational?: boolean;
  error?: CustomException;
}
