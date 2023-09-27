import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Entity } from "typeorm";

@Entity("user")
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 30,
    nullable: false,
  })
  password!: string;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user", 
  })
  role!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
  username: any;
}

export { User };
