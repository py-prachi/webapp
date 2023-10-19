import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./User";
import { Products } from "./Products";

@Entity("cart")
class Cart {
  @PrimaryGeneratedColumn()
  cart_id!: number;

  @ManyToOne(() => User, (user) => user.cart, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Products, (product) => product.cart, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product!: Products;

  @Column({
    type: "int",
  })
  quantity!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  discountApplied!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  subtotal!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  total!: number;

  @Column({
    type: "varchar",
    length: 20,
  })
  status!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}

export { Cart };
