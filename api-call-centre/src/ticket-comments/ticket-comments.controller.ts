import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketComments } from 'entities/TicketComments';
import { TicketCommentsService } from './ticket-comments.service';
import { CreateTicketCommentDto } from 'src/DTOs/ticketComments.dto';

@Controller('ticket-comments')
export class TicketCommentsController {
    constructor(private readonly ticketCommentsService: TicketCommentsService) { }
    @Get(':idTicket')
    getTicketComments(@Param('idTicket') idTicket: number): Promise<CreateTicketCommentDto[]> {
        return this.ticketCommentsService.getTicketComments(idTicket);
    }
    @Post()
    addTicketComment(@Body() ticketComment: CreateTicketCommentDto): Promise<CreateTicketCommentDto> {
        return this.ticketCommentsService.addTicketComments(ticketComment);
    }
}
