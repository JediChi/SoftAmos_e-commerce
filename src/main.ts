import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { logger } from 'src/loggers/pino.logger';
import { SwaggerModule } from '@nestjs/swagger';
import { swagger_config } from 'src/config/swagger.config';
import mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from './exceptions/validation.exception';
import { HttpExceptionFilter } from './filters/http.exception.filter';
import { ValidationFilter } from './filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const connection_url = process.env.DATABASE_URL;

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // allows for http-only cookies
  });

  // validation and http Filter
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            [`${error.property}`]: {
              error: `${error.property} has wrong value ${error.value}.`,
              message: Object.values(error.constraints).join(''),
            },
          };
        });
        return new ValidationException(messages);
      },
    }),
  );

  // Swagger setup
  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('docs', app, document);

  // Mongoose setup

  if (!connection_url) {
    throw new Error('Invalid connection url');
  }
  mongoose.set('strictQuery', false),
    mongoose
      .connect(connection_url)
      .then(() => {
        logger.info('Connected to database successfully');
      })
      .catch((err) => {
        logger.error('Failed to connect to database', err);
      });

  try {
    const PORT = process.env.PORT || 3006;
    await app.listen(PORT);
    logger.info(`Starting on port ${PORT}.`);
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
}
bootstrap().then();
