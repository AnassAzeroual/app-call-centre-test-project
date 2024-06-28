import { Calls } from "./calls.model";
import { TicketComments } from "./ticketComments.model";
import { Users } from "./users.model";

export class Tickets {
    constructor(
      public callId: number,
      public ticketId: number,
      public issueDescription: string,
      public ticketStatus: "En cours" | "Résolu" | "Annulé",
      public createdByUserId: number,
      public assignedToUserId: number | null,
      public creationDate: Date,
      public lastUpdateDate: Date | null,
      public call?: Calls, // Optional Calls object for call
      public createdByUser?: Users, // Optional Users object for createdByUser
      public assignedToUser?: Users | null, // Optional Users object for assignedToUser
      public ticketComments: TicketComments[] = [] // Empty array for ticketComments
    ) {}
  }
  