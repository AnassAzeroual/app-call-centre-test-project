export class Calls {
    constructor(
      public callDate: Date,
      public callDuration: number,
      public callType: "Sortant" | "Manqué" | "Entrant",
      public phoneNumber: string,
      public callId?: number,
      public deleted?: boolean,
      public callTickets?: number,
      public callSubject: string = '',
    ) {
      this.callDate = new Date(callDate);
    }
  }
  