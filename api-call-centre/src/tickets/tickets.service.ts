import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from 'entities/Notifications';
import { Tickets } from 'entities/Tickets';
import { Users } from 'entities/Users';
import { CreateTicketDto } from 'src/DTOs/tickets.dto';
import { UpdateTicketDto } from 'src/DTOs/update.dto';
import { Repository } from 'typeorm';
@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Tickets) private repoTicket: Repository<Tickets>,
    @InjectRepository(Users) private repoUsers: Repository<Users>,
    @InjectRepository(Notifications) private repoNotifications: Repository<Notifications>,
  ) {}

  async getTickets(): Promise<Tickets[]> {
    const tickets = await this.repoTicket.find();
    const respons = [];
    if (tickets) {
      for (const ticket of tickets) {
        console.log(ticket.assignedToUserId);

        respons.push({
          ...ticket,
          createdByUser: await this.repoUsers.findOne({
            where: { userId: Number(ticket.createdByUserId) },
            select: ['email', 'role'],
          }),
          assignedToUser: await this.repoUsers.findOne({
            where: { userId: Number(ticket.assignedToUserId) },
            select: ['email', 'role'],
          }),
        });
      }
    }

    return respons;
  }

  async getTicketsByUserId(userId: number): Promise<Tickets[]> {
    return await this.repoTicket.find({ where: { assignedToUserId: userId } });
  }

  async getTicketById(ticketId: number): Promise<Tickets> {
    return await this.repoTicket.findOne({ where: { ticketId: ticketId } });
  }

  async getTicketsByPhone(phone: string): Promise<Tickets[]> {
    return await this.repoTicket
      .createQueryBuilder('t')
      .innerJoin('t.call', 'c')
      .where('c.phoneNumber = :phoneNumber', { phoneNumber: phone })
      .getMany();
  }

  async getCountTicketsByPhone(phone: string): Promise<number> {
    return await this.repoTicket
      .createQueryBuilder('t')
      .innerJoin('t.call', 'c')
      .where('c.phoneNumber = :phoneNumber', { phoneNumber: phone })
      .getCount();
  }

  async createTicket(ticket: CreateTicketDto): Promise<CreateTicketDto> {
    let tempNotif = this.repoNotifications.create();
    const userData = await this.repoUsers.findOne({where:{userId:ticket.createdByUserId}});
    tempNotif.createdByUserId = userData.userId;
    tempNotif.ticketType = `création de ticket`;
    tempNotif.email = userData.email;
    tempNotif.readed = false;
    tempNotif.subject = `${userData.firstName} ${userData.lastName} a créé un ticket pour l'appel ID : ${ticket.callId}`;
    tempNotif.date = new Date();
    this.repoNotifications.save(tempNotif)
    return await this.repoTicket.save(ticket);
  }

  async updateTicket(id: number,newData: Partial<UpdateTicketDto>): Promise<UpdateTicketDto | undefined> {
    const data = await this.repoTicket.findOne({ where: { ticketId: id } });

    Object.keys(newData).forEach((key) => {
      data[key] = newData[key];
    });

    const res = await this.repoTicket.save(data);
    let tempNotif = this.repoNotifications.create();
    const userData = await this.repoUsers.findOne({where:{userId:data.createdByUserId}});
    tempNotif.createdByUserId = userData.userId;
    tempNotif.ticketType = `modification de ticket`;
    tempNotif.email = userData.email;
    tempNotif.readed = false;
    tempNotif.subject = `${userData.firstName} ${userData.lastName} a modifier un ticket pour l'appel ID : ${data.callId}`;
    tempNotif.date = new Date();
    this.repoNotifications.save(tempNotif)
    return res;
  }
}
