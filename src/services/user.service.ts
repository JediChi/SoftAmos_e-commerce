import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserRequestDto } from 'src/dto/request/create.user.request.dto';
import {
  ILogin,
  IOptions,
  IUser,
  IUserAccess,
  LoginFlow,
  UserResponseMsg,
} from 'src/interfaces/user.interface';
import { User } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from 'src/dto/request/login.user.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private user_model: typeof Model<User>,
    private jwt_service: JwtService,
  ) {}

  async create_user(user: CreateUserRequestDto): Promise<IUser> {
    const existing_user = await this.user_model.findOne({email: user.email});

    if (existing_user) {
      throw new BadRequestException('This user already exists');
    }

    const password = await bcrypt.hash(user.password, 8);

    const new_user = await this.user_model.create({
      ...user,
      password,
    });

    const result = await new_user.save();

    return {
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      id: result.id
    };
  }

  async create_access_token(user: IUser, options?: IOptions): Promise<string> {
    const pay_load = {
      sub: user.id,
      email: user.email,
    };

    return this.jwt_service.sign(pay_load, options);
  }

  async login_user(
    login: LoginRequestDto,
    user_agent: string,
  ): Promise<ILogin> {
    const user_logged_in = await this.validate_user(
      login.email,
      login.password,
    );
    if (!user_logged_in.has_access) {
      let response_message = null;
      if (user_logged_in.msg == UserResponseMsg.NO_ACCESS) {
        response_message =
          'You no longer have access to this account, Please reset your password.';
      }
      if (user_logged_in.msg == UserResponseMsg.INVALID_USER) {
        response_message = 'Invalid User Credentials';
      }
      if (user_logged_in.msg == UserResponseMsg.INCORRECT_PASSWORD) {
        response_message = 'Invalid User Credentials/Incorrect Password';
        user_logged_in.user = await this.calculate_login_attempt(
          false,
          user_logged_in.user,
        );
      }
      const response = {
        user: user_logged_in.user
          ? {
              active: user_logged_in.user.active,
              email: user_logged_in.user.email,
              id: user_logged_in.user.id,
              num_login_attempts: user_logged_in.user.num_login_attempts,
            }
          : {},
        msg: response_message ?? 'Invalid credentials or Unauthorized',
      };
      throw new UnauthorizedException(response);
    }

    await this.process_login_flow(
      user_logged_in.user,
      user_logged_in.has_access,
    );
    const access_token = await this.create_access_token(user_logged_in.user, {
      expiresIn: login.remember_me ? '14d' : '24h',
    });

    return {
      access_token,
      user: user_logged_in.user,
    };
  }

  async process_login_flow(user: IUser, should_not_access: boolean) {
    if (!user.active) {
      throw new UnauthorizedException(
        `We are unable to provide you access to your account: '${user.status}'`,
      );
    }
    await this.calculate_login_attempt(should_not_access, user);
  }

  async calculate_login_attempt(
    should_not_access: boolean,
    user: IUser,
  ): Promise<IUser | null> {
    const update_options: LoginFlow = {};
    const login_attempt_count = user.num_login_attempts;
    if (!should_not_access) {
      if (login_attempt_count == 5 && user.active) {
        update_options.active = false;
        update_options.status = 'disabled';
      } else {
        if (user.num_login_attempts < 5) {
          update_options.num_login_attempts = login_attempt_count + 1;
        }
      }
    } else {
      update_options.num_login_attempts = 0;
      update_options.last_login_date = new Date();
    }
    if (Object.keys(update_options).length > 0) {
      await this.update_by_id(user, update_options);
      return await this.find_by_id(user.id);
    }
    return null;
  }

  async validate_user(email: string, password: string): Promise<IUserAccess> {
    const user = await this.find_by_email(email);
    if (!user) {
      return {
        user: user,
        has_access: false,
        msg: UserResponseMsg.INVALID_USER,
      };
    }

    if (!user.active) {
      return {
        user: user,
        has_access: false,
        msg: UserResponseMsg.NO_ACCESS,
      };
    }

    const password_match = await bcrypt.compare(password, user.password);
    if (!password_match) {
      return {
        user: user,
        has_access: false,
        msg: UserResponseMsg.INCORRECT_PASSWORD,
      };
    }

    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        last_login_date: user.last_login_date,
        num_login_attempts: user.num_login_attempts,
        status: user.status,
        active: user.active,
      },
      has_access: true,
    };
  }

  async update_by_id(user: IUser, update_options: LoginFlow): Promise<IUser> {
    const updated_user = await this.user_model.findByIdAndUpdate(
      user.id,
      update_options,
      { new: true },
    );

    return updated_user;
  }

  async find_by_id(id: string): Promise<IUser | null> {
    return this.user_model.findById(id);
  }

  async find_by_email(email: string): Promise<IUser | null> {
    return this.user_model.findOne({ email });
  }
}
