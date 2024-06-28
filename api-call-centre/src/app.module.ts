import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mariadb",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "",
      "database": "db_call_centre",
      "synchronize": false,
      "entities": [
        "./entities/*{.ts,.js}"
      ]
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,

  }],
})
export class AppModule {}
