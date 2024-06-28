import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tickets } from "./Tickets";

@Index("ticket_comments_fk1", ["ticketId"], {})
@Entity("ticket_comments", { schema: "db_call_centre" })
export class TicketComments {
  @PrimaryGeneratedColumn({ type: "int", name: "comment_id" })
  commentId: number;

  @Column("int", { name: "ticket_id" })
  ticketId: number;

  @Column("text", { name: "comment_text" })
  commentText: string;

  @Column("datetime", { name: "comment_date" })
  commentDate: Date;

  @Column("int", { name: "commented_by_user_id" })
  commentedByUserId: number;

  @ManyToOne(() => Tickets, (tickets) => tickets.ticketComments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ticket_id", referencedColumnName: "ticketId" }])
  ticket: Tickets;
}
