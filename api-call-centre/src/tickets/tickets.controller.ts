import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Tickets } from 'entities/Tickets';
import { CreateTicketDto } from 'src/DTOs/tickets.dto';
import { TicketsService } from './tickets.service';

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
    createTicket(@Body() ticket: CreateTicketDto): Promise<CreateTicketDto> {
        console.log(ticket);

        return this.ticketService.createTicket(ticket);
    }

}
