import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ) {}
  getHello(): string {
    return 'Hello World!';
  }


  sendNotif(tempNotif:any)
  {
    // this.notificationGateway.sendNotification(JSON.stringify(tempNotif));
  }
}
