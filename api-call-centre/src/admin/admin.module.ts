import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calls } from 'entities/Calls';
import { Tickets } from 'entities/Tickets';
import { Users } from 'entities/Users';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Calls,Tickets,Users])
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
