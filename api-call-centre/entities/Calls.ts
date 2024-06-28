import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tickets } from "./Tickets";

@Entity("calls", { schema: "db_call_centre" })
export class Calls {
  @PrimaryGeneratedColumn({ type: "int", name: "call_id" })
  callId: number;

  @Column("datetime", { name: "call_date" })
  callDate: Date;

  @Column("int", { name: "call_duration" })
  callDuration: number;

  @Column("varchar", { name: "call_subject", length: 255 })
  callSubject: string;

  @Column("enum", {
    name: "call_type",
    enum: ["Sortant", "Manqué", "Entrant"],
    default: () => "'Entrant'",
  })
  callType: "Sortant" | "Manqué" | "Entrant";

  @Column("int", { name: "call_tickets", default: () => "'0'" })
  callTickets: number;

  @Column("varchar", { name: "phone_number", length: 255 })
  phoneNumber: string;

  @Column("tinyint", { name: "deleted", width: 1, default: () => "'0'" })
  deleted: boolean;

  @OneToMany(() => Tickets, (tickets) => tickets.call)
  tickets: Tickets[];
}
