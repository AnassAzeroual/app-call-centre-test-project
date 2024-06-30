
export class Tickets {
  constructor(
    public callId: number,
    public issueDescription: string,
    public ticketStatus: "En cours" | "Résolu" | "Annulé",
    public createdByUserId: number,
    public assignedToUserId?: number | null,
    public creationDate?: Date,
    public lastUpdateDate?: Date | null,
    public ticketId?: number,
    public assignedToUser?:userInfo,
    public createdByUser?:userInfo,
  ) { }
}


class userInfo {
  email!: string;
  role!: number;
}