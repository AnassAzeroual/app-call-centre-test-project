
export class Notifications {
  constructor(
    public id: number,
    public ticketType: string,
    public callType: string,
    public date: Date,
    public email: string,
    public subject: string,
    public createdByUserId: number,
  ) { }
}
