import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from 'src/DTOs/users.dto';

@Controller('admin')
export class AdminController {
    constructor(private srv: AdminService) { }
    @Get('users')
    getUsers(): Promise<CreateUserDto[]> {
        return this.srv.getUsers();
    }

    @Get('agents')
    getAgents(): Promise<CreateUserDto[]> {
        return this.srv.getAgents();
    }

}
