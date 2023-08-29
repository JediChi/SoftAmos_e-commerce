import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { ValidationException } from 'src/exceptions/validation.exception';
  
  @Catch(ValidationException)
  export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): any {
      const context = host.switchToHttp();
      const response = context.getResponse();
      const request = context.getRequest<Request>();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      response.status(status).json({
        status,
        error: exception.error,
        path: request.url,
      });
    }
  }
  