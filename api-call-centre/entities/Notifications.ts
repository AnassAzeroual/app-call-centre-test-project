import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("notifications_fk6", ["createdByUserId"], {})
@Entity("notifications", { schema: "db_call_centre" })
export class Notifications {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "ticket_type", length: 250 })
  ticketType: string;

  @Column("varchar", { name: "call_type", length: 250 })
  callType: string;

  @Column("datetime", { name: "date" })
  date: Date;

  @Column("varchar", { name: "email", length: 250 })
  email: string;

  @Column("varchar", { name: "subject", length: 500 })
  subject: string;

  @Column("int", { name: "created_by_user_id" })
  createdByUserId: number;

  @ManyToOne(() => Users, (users) => users.notifications, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "created_by_user_id", referencedColumnName: "userId" }])
  createdByUser: Users;
}
