import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calls } from 'entities/Calls';
import { Notifications } from 'entities/Notifications';
import { Tickets } from 'entities/Tickets';
import { Users } from 'entities/Users';
import { CreateCallDto } from 'src/DTOs/calls.dto';
import { UpdateCallDto } from 'src/DTOs/update.dto';
import { Repository } from 'typeorm';


@Injectable()
export class CallsService {
    constructor(
        @InjectRepository(Calls) private repoCalls: Repository<Calls>,
        @InjectRepository(Tickets) private repoTicket: Repository<Tickets>,
        @InjectRepository(Users) private repoUsers: Repository<Users>,
        @InjectRepository(Notifications) private repoNotifications: Repository<Notifications>
    ) { }

    async getAllCalls(): Promise<CreateCallDto[]> {

        const calls = await this.repoCalls.find();
        let response = [];
        if (calls) {
            for (const call of calls) {
                response.push({
                    ...call,
                    callTickets: await this.repoTicket
                        .createQueryBuilder('ticket')
                        .innerJoin('ticket.call', 'c')
                        .where('c.phoneNumber = :phoneNumber', { phoneNumber: call.phoneNumber })
                        .getCount()
                })
            }
        }
        return response;
    }

    async getCallById(id: number): Promise<CreateCallDto | undefined> {
        return await this.repoCalls.findOne({ where: { callId: +id } });
    }

    async createCall(call: CreateCallDto): Promise<CreateCallDto> {
        const tempCall = this.repoCalls.create(call);
        let tempNotif = this.repoNotifications.create();
        const userData = await this.repoUsers.findOne({ where: { userId: call.createdByUserId } });
        if (userData) {
            tempNotif.createdByUserId = userData.userId;
            tempNotif.ticketType = `création d'appel`;
            tempNotif.email = userData.email;
            tempNotif.readed = false;
            tempNotif.subject = `${userData.firstName} ${userData.lastName} a créé un appel pour le numéro : ${call.phoneNumber}`;
            tempNotif.date = new Date();
            this.repoNotifications.save(tempNotif)
        }
        return await this.repoCalls.save(tempCall);
    }

    async updateCall(id: number, newData: Partial<UpdateCallDto>): Promise<UpdateCallDto | undefined> {
        const data = await this.repoCalls.findOne({ where: { callId: id } })

        Object.keys(newData).forEach((key) => {
            data[key] = newData[key];
        });

        const res = await this.repoCalls.save(data)

        let tempNotif = this.repoNotifications.create();
        const userData = await this.repoUsers.findOne({ where: { userId: data.createdByUserId } });
        if (userData) {
            tempNotif.createdByUserId = userData.userId;
            tempNotif.ticketType = `modification d'appel`;
            tempNotif.email = userData.email;
            tempNotif.readed = false;
            tempNotif.subject = `${userData.firstName} ${userData.lastName} a modifier un appel pour le numéro : ${data.phoneNumber}`;
            tempNotif.date = new Date();
            this.repoNotifications.save(tempNotif)
        }

        return res
    }

    async deleteCall(id: number): Promise<boolean> {
        const data = await this.repoCalls.findOne({ where: { callId: id } })
        data.deleted = true;

        const res = await this.repoCalls.save(data)
        return !!res
    }
}
