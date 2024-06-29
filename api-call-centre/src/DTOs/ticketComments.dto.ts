
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTicketCommentDto {
  @IsNumber()
  ticketId: number;

  @IsString()
  commentText: string;

  @IsDate()
  commentDate: Date;

  @IsNumber()
  commentedByUserId: number;
}
