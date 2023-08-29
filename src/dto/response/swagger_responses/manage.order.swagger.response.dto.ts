import { ApiProperty } from "@nestjs/swagger";

export class IAuditableDto {
  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;
}

export class ManageOrderResponseTypeDto extends IAuditableDto{
  @ApiProperty()
  user_id?: number;

  @ApiProperty()
  products: string[];

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;
}

export class ManageOrderResponseDto {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiProperty({
    type: ManageOrderResponseTypeDto
  })
  data: ManageOrderResponseTypeDto;
}