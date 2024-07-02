import { Module } from '@nestjs/common';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Module({
    imports:[],
    exports:[NotificationGateway],
    providers:[NotificationGateway]
})
export class SharedModule {}
