import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from 'entities/Notifications';
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
    @InjectRepository(Users) private repoUsers: Repository<Users>,
    @InjectRepository(Notifications) private repoNotifications: Repository<Notifications>,
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
    let tempTicketComment = await this.repoTicketComment.create(ticketComment);
    let tempNotif = this.repoNotifications.create();
    const userData = await this.repoUsers.findOne({where:{userId:tempTicketComment.commentedByUserId}});
    tempNotif.createdByUserId = tempTicketComment.commentedByUserId;
    tempNotif.ticketType = `Commentaire ticket`;
    tempNotif.email = userData.email;
    tempNotif.readed = false;
    tempNotif.subject = `${userData.firstName} ${userData.lastName} a ajouté un commentaire sur le ticket ID : ${tempTicketComment.ticketId}`;
    tempNotif.date = new Date();
    this.repoNotifications.save(tempNotif)
    return await this.repoTicketComment.save(tempTicketComment)
  }


}
