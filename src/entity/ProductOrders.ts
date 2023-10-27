import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Orders } from "./Orders";

@Entity("product_orders")
class ProductOrders {
  @PrimaryGeneratedColumn("uuid")
  product_order_id!: string;

  @ManyToOne(() => Orders, (order) => order.productOrders)
  @JoinColumn({ name: "order_id" })
  order!: Orders;
  
  @Column({
    type: "int",
  })
  product_id!: number;

  @Column({
    type: "varchar",
    unique: true,
  })
  product_name!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  category?: string;

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
    type: "date",
  })
  orderDate!: Date;

  @Column({
    type: "varchar",
    length: 20,
  })
  status!: string;
}

export { ProductOrders };
