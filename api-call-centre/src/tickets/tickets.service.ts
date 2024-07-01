import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return await this.repoTicket.save(ticket);
  }

  async updateTicket(
    id: number,
    newData: Partial<UpdateTicketDto>,
  ): Promise<UpdateTicketDto | undefined> {
    const data = await this.repoTicket.findOne({ where: { ticketId: id } });

    Object.keys(newData).forEach((key) => {
      data[key] = newData[key];
    });

    const res = await this.repoTicket.save(data);
    return res;
  }
}
