import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketComments } from 'entities/TicketComments';
import { Tickets } from 'entities/Tickets';
import { Users } from 'entities/Users';
import { CreateTicketCommentDto } from 'src/DTOs/ticketComments.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TicketCommentsService {
  constructor(
    @InjectRepository(TicketComments) private repoTicketComment: Repository<TicketComments>,
    @InjectRepository(Tickets) private repoTicket: Repository<Tickets>,
    @InjectRepository(Users) private repoUsers: Repository<Users>
  ) { }

  async getTicketComments(TicketId: number): Promise<CreateTicketCommentDto[]> {
    let ticketComments = await this.repoTicketComment.find({ where: { ticketId: TicketId } })
    let response = [];
    for (const ticket of ticketComments) {
      let author = await this.repoUsers.findOne({ where: { userId: ticket.commentedByUserId }, select: ['firstName', 'lastName', 'role', 'userId'] })
      response.push({ ...ticket, author })
    }

    return response
  }

  async addTicketComments(ticketComment:CreateTicketCommentDto): Promise<CreateTicketCommentDto> {
    let tempTicketComment = await this.repoTicketComment.create(ticketComment)
    return await this.repoTicketComment.save(tempTicketComment)
  }


}
