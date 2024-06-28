import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Calls } from "./Calls";
import { Users } from "./Users";
import { TicketComments } from "./TicketComments";

@Index("tickets_fk0", ["callId"], {})
@Index("tickets_fk4", ["createdByUserId"], {})
@Index("tickets_fk5", ["assignedToUserId"], {})
@Entity("tickets", { schema: "db_call_centre" })
export class Tickets {
  @Column("int", { name: "call_id" })
  callId: number;

  @PrimaryGeneratedColumn({ type: "int", name: "ticket_id" })
  ticketId: number;

  @Column("text", { name: "issue_description" })
  issueDescription: string;

  @Column("enum", {
    name: "ticket_status",
    enum: ["En cours", "Résolu", "Annulé"],
    default: () => "'En cours'",
  })
  ticketStatus: "En cours" | "Résolu" | "Annulé";

  @Column("int", { name: "created_by_user_id" })
  createdByUserId: number;

  @Column("int", { name: "assigned_to_user_id", nullable: true })
  assignedToUserId: number | null;

  @Column("datetime", {
    name: "creation_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationDate: Date;

  @Column("datetime", { name: "last_update_date", nullable: true })
  lastUpdateDate: Date | null;

  @ManyToOne(() => Calls, (calls) => calls.tickets, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "call_id", referencedColumnName: "callId" }])
  call: Calls;

  @ManyToOne(() => Users, (users) => users.tickets, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "created_by_user_id", referencedColumnName: "userId" }])
  createdByUser: Users;

  @ManyToOne(() => Users, (users) => users.tickets2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "assigned_to_user_id", referencedColumnName: "userId" }])
  assignedToUser: Users;

  @OneToMany(() => TicketComments, (ticketComments) => ticketComments.ticket)
  ticketComments: TicketComments[];
}
