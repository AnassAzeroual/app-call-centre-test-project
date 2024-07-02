import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calls } from 'entities/Calls';
import { Notifications } from 'entities/Notifications';
import { Tickets } from 'entities/Tickets';
import { Users } from 'entities/Users';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Tickets,Calls,Users,Notifications]),
    SharedModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
