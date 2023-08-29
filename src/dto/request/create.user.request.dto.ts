import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional,} from 'class-validator';
import { IsValidEmail } from 'src/decorators/valid.email.decorator';
import { PasswordStrength } from 'src/decorators/password.strength.decorator';
import { IsUniqueEmail } from 'src/decorators/unique.email.decorator';


export class CreateUserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsValidEmail()
  // @IsUniqueEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @PasswordStrength()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  phone_number: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  delivery_address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  user_name: string;
}
