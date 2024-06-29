import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  ticketType: string;

  @IsString()
  callType: string;

  @IsDate()
  @Transform(({ value }) => value || new Date())
  date: Date;

  @IsString()
  email: string;

  @IsString()
  subject: string;

  @IsNumber()
  createdByUserId: number;
}