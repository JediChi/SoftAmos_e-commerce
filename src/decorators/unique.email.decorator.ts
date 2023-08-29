import { InjectModel } from '@nestjs/mongoose';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import { Model } from 'mongoose';
import { CreateUserRequestDto } from 'src/dto/request/create.user.request.dto';
  import {User} from 'src/models/user.model';
  
  @ValidatorConstraint({ async: true })
  export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
    constructor(
      @InjectModel(User.name)
      private user_model: Model<User>
    ){}
    async validate(value: CreateUserRequestDto) {
      const user = await this.user_model.findOne({email: value.email});
      return !user;
    }
  
    defaultMessage(args: ValidationArguments) {
      return `This email address already exists`;
    }
  }
  
  export function IsUniqueEmail(option?: ValidationOptions) {
    return (obj: object, property_name: string) => {
      registerDecorator({
        target: obj.constructor,
        propertyName: property_name,
        options: option,
        constraints: [],
        validator: IsUniqueEmailConstraint,
        async: true,
      });
    };
  }
  