import { Injectable } from '@nestjs/common';
import { AppService, Call } from 'src/app.service';


@Injectable()
export class CallsService {
    constructor(private srvState:AppService){}

    getAllCalls(): Call[] {
        return this.srvState.calls;
    }

    async getCallById(id: number): Promise<Call | undefined> {
        return await this.srvState.calls.find((call) => call.id === Number(id));
    }

    createCall(call: Call): Call {
        const newCall = { id: this.srvState.calls.length + 1, ...call };
        this.srvState.calls.push(newCall);
        return newCall;
    }

    async updateCall(id: number, call: Partial<Call>): Promise<Call | undefined> {
        const originalcall = await this.getCallById(id);
        console.log(originalcall)
        for (let key in call) {
            if (originalcall.hasOwnProperty(key)) {
                originalcall[key] = call[key];
            }
            console.log(originalcall)
          }
        return await originalcall;
    }

    deleteCall(id: number): boolean {
        const callIndex = this.srvState.calls.findIndex((call) => call.id === Number(id));
        if (callIndex !== -1) {
            this.srvState.calls.splice(callIndex, 1);
            return true;
        }
        return false;
    }
}
