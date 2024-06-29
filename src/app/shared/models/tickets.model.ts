
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
  ) { }
}
