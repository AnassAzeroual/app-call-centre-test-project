import { PartialType } from "@nestjs/mapped-types";
import { CreateCallDto } from "./calls.dto";
import { CreateNotificationDto } from "./notifications.dto";
import { CreateRoleDto } from "./roles.dto";
import { CreateTicketCommentDto } from "./ticketComments.dto";
import { CreateTicketDto } from "./tickets.dto";
import { CreateUserDto } from "./users.dto";

export class UpdateCallDto extends PartialType(CreateCallDto) { }
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) { }
export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
export class UpdateTicketCommentDto extends PartialType(CreateTicketCommentDto) { }
export class UpdateTicketDto extends PartialType(CreateTicketDto) { }
export class UpdateUserDto extends PartialType(CreateUserDto) { }