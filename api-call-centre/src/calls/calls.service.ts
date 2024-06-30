import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calls } from 'entities/Calls';
import { Tickets } from 'entities/Tickets';
import { CreateCallDto } from 'src/DTOs/calls.dto';
import { UpdateCallDto } from 'src/DTOs/update.dto';
import { Repository } from 'typeorm';


@Injectable()
export class CallsService {
    constructor(
        @InjectRepository(Calls) private repoCalls: Repository<Calls>,
        @InjectRepository(Tickets) private repoTickets: Repository<Tickets>,
    ) { }

    async getAllCalls(): Promise<CreateCallDto[]> {

        const calls = await this.repoCalls.find();
        let response = [];
        if (calls) {
            for (const call of calls) {
                response.push({
                    ...call,
                    callTickets: await this.repoTickets
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
        return await this.repoCalls.save(tempCall);
    }

    async updateCall(id: number, newData: Partial<UpdateCallDto>): Promise<UpdateCallDto | undefined> {
        const data = await this.repoCalls.findOne({ where: { callId: id } })

        Object.keys(newData).forEach((key) => {
            data[key] = newData[key];
        });

        const res = await this.repoCalls.save(data)
        return res
    }

    async deleteCall(id: number): Promise<boolean> {
        const data = await this.repoCalls.findOne({ where: { callId: id } })
        data.deleted = true;

        const res = await this.repoCalls.save(data)
        return !!res
    }
}
