import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketComments } from 'entities/TicketComments';
import { TicketCommentsController } from './ticket-comments.controller';
import { TicketCommentsService } from './ticket-comments.service';
import { Tickets } from 'entities/Tickets';
import { Users } from 'entities/Users';
import { Notifications } from 'entities/Notifications';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([TicketComments, Tickets, Users,Notifications]),
  ],
  controllers: [TicketCommentsController],
  providers: [TicketCommentsService],
})
export class TicketCommentsModule {}
