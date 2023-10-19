import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Entity } from "typeorm";
import { Cart } from "./Cart";

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

  @OneToMany(() => Cart, (cart) => cart.user)
  cart!: Cart[];
}

export { User };
