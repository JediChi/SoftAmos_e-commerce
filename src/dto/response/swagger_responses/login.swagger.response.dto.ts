import { ApiProperty } from "@nestjs/swagger";

export class IAuditableDto {
    @ApiProperty()
    created_at?: Date;
  
    @ApiProperty()
    updated_at?: Date;
  }
  
  export class LoginResponseTypeDto extends IAuditableDto{
    @ApiProperty()
    id?: number;
  
    @ApiProperty()
    first_name: string;
  
    @ApiProperty()
    last_name: string;
  
    @ApiProperty()
    email: string;

    @ApiProperty()
    phone_number: number;

    @ApiProperty()
    delivery_address: string;

    @ApiProperty()
    user_name: string;
  
    @ApiProperty()
    last_login_date?: Date;
  
    @ApiProperty()
    num_login_attempts?: number;
  
    @ApiProperty()
    active?: boolean;
  }
  
  export class LoginResponseDto {
    @ApiProperty()
    status: number;
  
    @ApiProperty()
    message: string;
  
    @ApiProperty({
      type: LoginResponseTypeDto
    })
    data: LoginResponseTypeDto;
  }