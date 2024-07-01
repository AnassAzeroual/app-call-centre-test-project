

import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  callId: number;

  @IsString()
  issueDescription: string;

  @IsEnum(['En cours', 'Résolu', 'Annulé'])
  ticketStatus: "En cours" | "Résolu" | "Annulé";

  @IsNumber()
  createdByUserId: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value == null ? null : Number(value))
  assignedToUserId?: number | null;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value)) // Optional transformation for creationDate
  creationDate: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => value || new Date()) // Optional transformation for lastUpdateDate
  lastUpdateDate?: Date | null;
}
