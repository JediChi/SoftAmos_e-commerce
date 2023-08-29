import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from 'src/loggers/pino.logger';
import { SwaggerModule } from '@nestjs/swagger';
import { swagger_config } from 'src/config/swagger.config';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const connection_url = process.env.DATABASE_URL;

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
    logger.info(`Starting Authentication Service on port ${PORT}.`);
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
}
bootstrap().then();
