import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { config } from 'dotenv';
import { GetUser } from 'src/decorators/get.user.decorator';
import { FindDataRequestDto } from 'src/dto/request/find.data.request.dto';
import { ManageOrderRequestDto } from 'src/dto/request/manage.order.request.dto';
import { ResponseData } from 'src/dto/response/data.response.dto';
import { ValidationErrorResponseDto } from 'src/dto/response/swagger_responses/error.swagger.response.dto';
import { ManageOrderResponseDto } from 'src/dto/response/swagger_responses/manage.order.swagger.response.dto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { IOrder } from 'src/interfaces/order.interface';
import { IAuthUser } from 'src/interfaces/types.interface';
import { OrderService } from 'src/services/order.service';

config();

@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiTags('Order')
@ApiBearerAuth()
export class OrderController {
  constructor(private order_service: OrderService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'This creates orders for customers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Creates Orders for customers',
    type: ManageOrderResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input values',
    type: ValidationErrorResponseDto,
  })
  async create_order(
    @Body() order_data: ManageOrderRequestDto,
    @GetUser() user: IAuthUser,
  ): Promise<ResponseData<IOrder>> {
    const result = await this.order_service.create_order(order_data, user.sub);
    return {
      status: HttpStatus.CREATED,
      message: 'Order created successfully',
      data: result,
    };
  }

  @Get()
  @HttpCode(201)
  @ApiOperation({ summary: 'This gets orders for customers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieves Orders for customers',
    type: ManageOrderResponseDto,
  })
  async get_customer_order(
    @Query() query: FindDataRequestDto,
    @GetUser() user: IAuthUser,
  ): Promise<ResponseData<IOrder[]>> {
    const orders = await this.order_service.get_customer_orders(
      query.page,
      user.sub,
    );

    return {
      status: HttpStatus.OK,
      message: 'Order retreived successfully',
      data: orders,
    };
  }
}
