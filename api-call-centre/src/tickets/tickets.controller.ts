import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Tickets } from 'entities/Tickets';
import { Users } from 'entities/Users';
import { GetUser } from 'src/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
@UseGuards(AuthGuard())
export class TicketsController {

    constructor(private readonly ticketService: TicketsService) { }

    @Get()
    getAllTickets(): Promise<Tickets[]> {
        return this.ticketService.getTickets();
    }

    @Get(':phoneNumber')
    getCallById(@Param('phoneNumber') phoneNumber: string): Promise<any> {
        console.log(phoneNumber)
        return this.ticketService.getTicketsByPhone(phoneNumber);
    }

    @Get('/ticketByUserId/:id')
    getTicketByUserConnected(@Param('id') userId: number): Promise<Tickets[]> {
        return this.ticketService.getTicketsByUserId(userId);
    }

    @Post()
    createTicket(@Body() ticket: Tickets): Promise<Tickets> {
        return this.ticketService.createTicket(ticket);
    }

}
