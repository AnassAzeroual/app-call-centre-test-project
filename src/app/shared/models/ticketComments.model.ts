import { Tickets } from "./tickets.model";

export class TicketComments {
    constructor(
      public commentId: number,
      public ticketId: number,
      public commentText: string,
      public commentDate: Date,
      public commentedByUserId: number,
      public ticket?: Tickets // Optional Tickets object for ticket
    ) {}
  }
  