import { Module } from '@nestjs/common';
import { CallsController } from './calls.controller';
import { CallsService } from './calls.service';
import { Calls } from 'entities/Calls';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tickets } from 'entities/Tickets';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Calls,Tickets])
  ],
  controllers: [CallsController],
  providers: [CallsService]
})
export class CallsModule {}