import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { SecurityConfig } from 'src/interfaces/types.interface';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, user_schema } from 'src/models/user.model';

const jwt_module = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (config_service: ConfigService) => ({
    secret: config_service.get<SecurityConfig>('security').jwt_secret,
    signOptions: { expiresIn: '60m' },
  }),
  inject: [ConfigService],
});

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: user_schema }]),
    jwt_module,
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
