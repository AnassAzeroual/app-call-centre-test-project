import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCallDto {
  @IsDate()
  @Transform(({ value }) => value || new Date()) // Optional transformation for callDate
  callDate: Date;

  @IsNumber()
  callDuration: number;

  @IsString()
  callSubject: string;

  @IsEnum(['Sortant', 'Manqué', 'Entrant'])
  callType: "Sortant" | "Manqué" | "Entrant";

  @IsNumber()
  callTickets: number;

  @IsString()
  phoneNumber: string;

  @IsBoolean()
  deleted: boolean;
}
