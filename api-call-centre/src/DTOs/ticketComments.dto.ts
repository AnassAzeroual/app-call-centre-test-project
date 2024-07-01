import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './users.dto';
import { Transform } from 'class-transformer';
type OptionalUsers = Partial<CreateUserDto>;
export class CreateTicketCommentDto {
  @IsNumber()
  ticketId: number;

  @IsString()
  commentText: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  commentDate: Date;

  @IsNumber()
  commentedByUserId: number;

  @IsOptional()
  public author?: OptionalUsers
}
