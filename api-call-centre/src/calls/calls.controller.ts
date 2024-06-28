import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CallsService } from './calls.service';
import { Calls } from 'entities/Calls';

@Controller('calls')
export class CallsController {
    constructor(private readonly callsService: CallsService) { }

    @Get()
    getAllCalls(): Promise<Calls[]> {
        return this.callsService.getAllCalls();
    }

    @Get(':id')
    getCallById(@Param('id') id: number): Promise<Calls> {
        console.log(id)
        return this.callsService.getCallById(id);
    }

    @Post()
    createCall(@Body() call: Calls): Calls {
        return this.callsService.createCall(call);
    }

    @Put(':id')
    updateCall(@Param('id') id: number, @Body() call: Partial<Calls>): Promise<Calls> {
        return this.callsService.updateCall(id, call);
    }

    @Delete(':id')
    deleteCall(@Param('id') id: number): Promise<Boolean> {
        return this.callsService.deleteCall(id);
    }
}