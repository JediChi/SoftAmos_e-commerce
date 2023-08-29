import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const context = host.switchToHttp();
      const response = context.getResponse<Response>();
      const request = context.getRequest<Request>();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR
      let message: any = 'Unknown error occurred';
      if (exception instanceof Error) {
        if (exception['response']) {
          message = exception['response'];
        } else {
          message = exception.message;
        }
      }
  
      response.status(status).json({
        status,
        error: message,
        path: request.url,
      });
    }
  }
  