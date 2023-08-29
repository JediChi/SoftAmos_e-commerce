import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserRequestDto } from 'src/dto/request/create.user.request.dto';
import { LoginRequestDto } from 'src/dto/request/login.user.request.dto';
import { ResponseData } from 'src/dto/response/data.response.dto';
import { CreateUserResponseDto } from 'src/dto/response/swagger_responses/create.user.swagger.response.dto';
import {
  ValidationErrorResponseDto,
  OperationalErrorResponseDto,
} from 'src/dto/response/swagger_responses/error.swagger.response.dto';
import { LoginResponseDto } from 'src/dto/response/swagger_responses/login.swagger.response.dto';
import { ILogin, IUser } from 'src/interfaces/user.interface';
import { UserService } from 'src/services/user.service';

@Controller('auth')
@ApiTags('Auth')
export class UserController {
  constructor(private user_service: UserService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'This logs in registered users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login User',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input values',
    type: ValidationErrorResponseDto,
  })
  @ApiNotAcceptableResponse({
    description: 'Invalid credentials',
    type: OperationalErrorResponseDto,
  })
  async sign_in(
    @Body() login: LoginRequestDto,
    @Request() req,
  ): Promise<ResponseData<ILogin>> {
    const result = await this.user_service.login_user(
      login,
      req.headers['user-agent'],
    );
    return {
      status: HttpStatus.OK,
      message: 'Login successful',
      data: result,
    };
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'This creates new users' })
  @ApiCreatedResponse({
    description: 'Registered User Successfully',
    type: CreateUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input values',
    type: ValidationErrorResponseDto,
  })
  async create_user(
    @Body() user: CreateUserRequestDto,
  ): Promise<ResponseData<IUser>> {
    const result = await this.user_service.create_user(user);
    return {
      status: HttpStatus.CREATED,
      message: 'User account created successfully',
      data: result,
    };
  }
}
