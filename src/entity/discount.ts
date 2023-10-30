import { BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Entity } from "typeorm";
import { ProductDiscount } from "./ProductDiscounts";

enum DiscountType {
  FLAT = "flat",
  PERCENT = "percent",
}

@Entity("discount")
class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  discount_id!: number;

  @Column({
    type: "varchar",
    unique: true,
  })
  coupon!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @Column({
    type: "enum",
    enum: DiscountType,
    default: DiscountType.FLAT,
  })
  discount_type!: DiscountType;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  discount_rate!: number;

  @Column({
    name: "is_active",
    type: "boolean",
    default: false,
  })
  status: boolean | undefined;

  @Column({
    type: "timestamp",
  })
  startDate: Date | undefined;

  @Column({
    type: "timestamp",
  })
  endDate: Date | undefined;
  
  @OneToMany(() => ProductDiscount, (productDiscount) => productDiscount.discount)
  productDiscount!: ProductDiscount[];
}

export { Discount, DiscountType };
