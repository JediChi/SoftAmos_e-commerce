import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { get_mongoose_config } from 'src/config/mongoose.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

config()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [get_mongoose_config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoose.connection_url'),
        // Other Mongoose options
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
