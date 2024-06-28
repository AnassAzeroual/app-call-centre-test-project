import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tickets } from 'entities/Tickets';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
    constructor(@InjectRepository(Tickets) private repoTicket: Repository<Tickets>) { }

    async getTickets(): Promise<Tickets[]> {
        return await this.repoTicket.find();
    }

    async getTicketsByUserId(userId: number): Promise<Tickets[]> {
        return await this.repoTicket.find({ where: { assignedToUserId: userId } });
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


    async createTicket(ticket: Tickets): Promise<Tickets> {
        return await this.repoTicket.save(ticket);
    }


}
