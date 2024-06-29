import { IsEnum, IsNumber } from 'class-validator';

export class CreateRoleDto {
  @IsEnum(['agent', 'supervisor'])
  name: "agent" | "supervisor";
}
