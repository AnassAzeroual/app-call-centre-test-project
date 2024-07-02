import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CallsModule } from './calls/calls.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { TicketCommentsModule } from './ticket-comments/ticket-comments.module';
import { TicketsModule } from './tickets/tickets.module';
import { SharedModule } from './shared/shared.module';

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
    AuthModule,
    CallsModule,
    TicketsModule,
    AdminModule,
    TicketCommentsModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule { }
