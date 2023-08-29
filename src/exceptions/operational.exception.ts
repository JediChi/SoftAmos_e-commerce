import { HttpStatus } from '@nestjs/common';
import { CustomException } from 'src/interfaces/error.interface';

export class OperationalException
  extends Error
  implements Omit<CustomException, 'code' | 'error'>
{
  statusCode: number;
  status: 'failure' | 'error';
  constructor(message, status_code = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = status_code;
    this.status = `${status_code}`.startsWith('4') ? 'failure' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}
