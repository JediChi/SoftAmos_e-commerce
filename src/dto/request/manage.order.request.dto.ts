import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray,} from 'class-validator';


export class ManageOrderRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  products: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

}
