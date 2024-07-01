import { Users } from './users.model';
type OptionalUsers = Partial<Users>;
export class TicketComments {
  public author?: OptionalUsers
  constructor(
    public commentText: string,
    public commentedByUserId: number,
    public commentDate: Date = new Date(),
    public ticketId?: number,
    public commentId?: number
  ) { }
}
