import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'src/interfaces/types.interface';

export class ValidationException extends BadRequestException {
  constructor(public error: ValidationError[]) {
    super();
  }
}
