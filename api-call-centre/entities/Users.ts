import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notifications } from "./Notifications";
import { Tickets } from "./Tickets";
import { Roles } from "./Roles";

@Index("user_id", ["userId"], { unique: true })
@Index("email", ["email"], { unique: true })
@Index("users_fk5", ["role"], {})
@Entity("users", { schema: "db_call_centre" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("varchar", { name: "first_name", length: 255, default: () => "'50'" })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255, default: () => "'50'" })
  lastName: string;

  @Column("varchar", {
    name: "email",
    unique: true,
    length: 255,
    default: () => "'100'",
  })
  email: string;

  @Column("varchar", { name: "password", length: 255, default: () => "'255'" })
  password: string;

  @Column("int", { name: "role" })
  role: number;

  @OneToMany(
    () => Notifications,
    (notifications) => notifications.createdByUser
  )
  notifications: Notifications[];

  @OneToMany(() => Tickets, (tickets) => tickets.createdByUser)
  tickets: Tickets[];

  @OneToMany(() => Tickets, (tickets) => tickets.assignedToUser)
  tickets2: Tickets[];

  @ManyToOne(() => Roles, (roles) => roles.users, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "role", referencedColumnName: "id" }])
  role2: Roles;
}
