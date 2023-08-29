import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { SecurityConfig } from 'src/interfaces/types.interface';
import { UserService } from 'src/services/user.service';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config_service: ConfigService,
    private user_service: UserService,
  ) {
    const security_config = config_service.get<SecurityConfig>('security');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: security_config.jwt_secret,
    });
  }

  async validate(payload: any): Promise<IUser> {
    const user = await this.user_service.find_by_id(payload.sub);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      active: user.active,
      status: user.status,
    };
  }
}
