import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Tickets } from 'entities/Tickets';
import { CreateTicketDto } from 'src/DTOs/tickets.dto';
import { TicketsService } from './tickets.service';
import { UpdateTicketDto } from 'src/DTOs/update.dto';

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
        return this.ticketService.getTicketsByPhone(phoneNumber);
    }

    @Get('ticketById/:id')
    getTicketByID(@Param('id') ticketId: number): Promise<Tickets> {
        return this.ticketService.getTicketById(ticketId);
    }

    @Get('/ticketByUserId/:id')
    getTicketByUserConnected(@Param('id') userId: number): Promise<Tickets[]> {
        return this.ticketService.getTicketsByUserId(userId);
    }

    @Post()
    createTicket(@Body() ticket: CreateTicketDto): Promise<CreateTicketDto> {
        return this.ticketService.createTicket(ticket);
    }

    @Put(':id')
    updateTicket(@Param('id') id: number, @Body() Ticket: UpdateTicketDto): Promise<UpdateTicketDto> {
        return this.ticketService.updateTicket(id, Ticket);
    }

}
