import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { get_mongoose_config } from 'src/config/mongoose.config';
import security_config from 'src/config/security.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/modules/user.module';

config()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [get_mongoose_config, security_config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoose.connection_url'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AppModule {}
