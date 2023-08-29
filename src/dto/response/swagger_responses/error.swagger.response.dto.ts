import { ApiProperty } from "@nestjs/swagger";

class PropertyErrorTypeDto {
  @ApiProperty()
  error: string;

  @ApiProperty()
  message: string;
}

export class ValidationErrorTypeDto {

  @ApiProperty({
    description: "The property or field that has the error",
    type: PropertyErrorTypeDto
  })
  property: PropertyErrorTypeDto;
}

export class OperationalErrorTypeDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;
}

export class ValidationErrorResponseDto {
  @ApiProperty()
  status: number;

  @ApiProperty()
  path: string;

  @ApiProperty({
    type: [ValidationErrorTypeDto],
  })
  error:  [ValidationErrorTypeDto];
}

export class OperationalErrorResponseDto {
  @ApiProperty()
  status: number;

  @ApiProperty()
  path: string;

  @ApiProperty({
    type: OperationalErrorTypeDto
  })
  error:  OperationalErrorTypeDto
}
