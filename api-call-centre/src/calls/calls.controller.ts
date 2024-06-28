import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CallsService } from './calls.service';
import { Call } from 'src/app.service';

@Controller('calls')
export class CallsController {
    constructor(private readonly callsService: CallsService) { }

    @Get()
    getAllCalls(): Call[] {
        return this.callsService.getAllCalls();
    }

    @Get(':id')
    getCallById(@Param('id') id: number): Promise<Call> {
        console.log(id)
        return this.callsService.getCallById(id);
    }

    @Post()
    createCall(@Body() call: Call): Call {
        return this.callsService.createCall(call);
    }

    @Put(':id')
    updateCall(@Param('id') id: number, @Body() call: Partial<Call>): Promise<Call> {
        return this.callsService.updateCall(id, call);
    }

    @Delete(':id')
    deleteCall(@Param('id') id: number): boolean {
        return this.callsService.deleteCall(id);
    }
}