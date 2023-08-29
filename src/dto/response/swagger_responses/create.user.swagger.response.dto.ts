import { ApiProperty } from "@nestjs/swagger";

export class IAuditableDto {
  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;
}

export class CreateUserResponseTypeDto{
  @ApiProperty()
  id?: number;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  user_name: string;

  @ApiProperty()
  delivery_address: string;

}

export class CreateUserResponseDto {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiProperty({
    type: CreateUserResponseTypeDto
  })
  data: CreateUserResponseTypeDto;
}