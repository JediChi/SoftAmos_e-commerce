import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  import validate from 'deep-email-validator';
  
  @ValidatorConstraint({ async: true })
  export class IsValidEmailConstraint implements ValidatorConstraintInterface {
    async validate(value: string) {
      const is_valid_record = await validate({
        email: value,
        sender: value,
        validateRegex: true,
        validateMx: true,
        validateTypo: false,
        validateDisposable: true,
        validateSMTP: false,
      });
      return !!is_valid_record.valid;
    }

    defaultMessage(args: ValidationArguments) {
      return `This email address is not a valid email address`;
    }
  }
  
  export function IsValidEmail(option?: ValidationOptions) {
    return (obj: object, property_name: string) => {
      registerDecorator({
        target: obj.constructor,
        propertyName: property_name,
        options: option,
        constraints: [],
        validator: IsValidEmailConstraint,
        async: true,
      });
    };
  }
  