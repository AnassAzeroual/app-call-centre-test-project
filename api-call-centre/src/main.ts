import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:3000',
    'ws://localhost:4000',
    'ws://192.168.101.153:4000',
    'http://192.168.101.153:3000',
    'http://192.168.101.153:4200',
    'https://chati.auclairgroup.com'
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };
  app.enableCors({ ...corsOptions });
  const port = process.env.PORT || 3000
  await app.listen(port, '0.0.0.0', () => console.log(`Listening on ${port}`));
}
bootstrap();
