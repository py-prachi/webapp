import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Products } from "./Products"; 
import { Discount } from "./discount";

@Entity("product_discount")
class ProductDiscount {
  @PrimaryGeneratedColumn("uuid")
  product_discount_id!: string; 

  @ManyToOne(() => Products, (product) => product.productDiscount, {
    onDelete: "CASCADE",  
    onUpdate: "CASCADE", 
  })
  @JoinColumn({ name: "product_id" })  
  product!: Products;

  @ManyToOne(() => Discount, (discount) => discount.productDiscounts,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({name : "discount_id"})
  discount!: Discount;

  @Column({ type: "date" })
  apply_date!: Date;

  @Column({ type: "date" })
  end_date!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export { ProductDiscount };


