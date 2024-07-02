import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Tickets } from 'entities/Tickets';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calls } from 'entities/Calls';
import { Users } from 'entities/Users';
import { Notifications } from 'entities/Notifications';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Tickets,Calls,Users,Notifications])
  ],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
