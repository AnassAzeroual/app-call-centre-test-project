import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'entities/Users';
import { CreateUserDto } from 'src/DTOs/users.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Users) private repoUsers: Repository<Users>
    ) { }

    async getUsers(): Promise<CreateUserDto[]> {
        return await this.repoUsers.find({ select: ['email', 'firstName', 'lastName', 'notifications', 'role', 'userId'] });
    }

    getAgents() {
        return this.repoUsers.find({ where: { role: 1 }, select: ['email', 'firstName', 'lastName', 'role', 'userId'] });
    }
}
