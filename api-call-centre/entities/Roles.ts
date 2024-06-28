import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity("roles", { schema: "db_call_centre" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("enum", {
    name: "name",
    enum: ["agent", "supervisor"],
    default: () => "'agent'",
  })
  name: "agent" | "supervisor";

  @OneToMany(() => Users, (users) => users.role2)
  users: Users[];
}
