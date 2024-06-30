import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCallDto } from 'src/DTOs/calls.dto';
import { UpdateCallDto } from 'src/DTOs/update.dto';
import { CallsService } from './calls.service';

@Controller('calls')
@UseGuards(AuthGuard())
export class CallsController {
    constructor(private readonly callsService: CallsService) { }

    @Get()
    getAllCalls(): Promise<CreateCallDto[]> {
        return this.callsService.getAllCalls();
    }

    @Get(':id')
    getCallById(@Param('id') id: number): Promise<CreateCallDto> {
        console.log(id)
        return this.callsService.getCallById(id);
    }

    @Post()
    createCall(@Body() call: CreateCallDto): Promise<CreateCallDto> {
        return this.callsService.createCall(call);
    }

    @Put(':id')
    updateCall(@Param('id') id: number, @Body() call: UpdateCallDto): Promise<UpdateCallDto> {
        return this.callsService.updateCall(id, call);
    }

    @Delete(':id')
    deleteCall(@Param('id') id: number): Promise<Boolean> {
        return this.callsService.deleteCall(id);
    }
}