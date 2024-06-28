export class Calls {
    constructor(
      public callId: number,
      public callDate: Date,
      public callDuration: number,
      public callSubject: string,
      public callType: "Sortant" | "Manqué" | "Entrant",
      public callTickets: number,
      public phoneNumber: string,
      public deleted: boolean
    ) {}
  }
  