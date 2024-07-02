import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCallDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @Transform(({ value }) => new Date(value))
  callDate: Date;

  @IsNumber()
  callDuration: number;

  @IsString()
  @IsOptional()
  callSubject: string;

  @IsEnum(['Sortant', 'Manqué', 'Entrant'])
  callType: "Sortant" | "Manqué" | "Entrant";

  @IsNumber()
  @IsOptional()
  callTickets: number;

  @IsString()
  phoneNumber: string;

  @IsNumber()
  createdByUserId: number;

  @IsBoolean()
  deleted: boolean = false;
}
