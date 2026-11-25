import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { TransformInterceptor } from './utils/transform.interceptor.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // apply the validation pipe globally to validate incoming requests based on the DTOs defined in the application
  app.useGlobalPipes(new ValidationPipe());

  // apply our own custom interceptor globally to transform the response data before sending it back to the client
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();
