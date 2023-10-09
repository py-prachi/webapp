import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
  } from "typeorm";
  
import { Entity } from "typeorm";
import { Discount } from "./discount";

  enum ProductStatus {
    AVAILABLE = "available",
    OUT_OF_STOCK = "out_of_stock",
    DISCONTINUED = "discontinued",
  }
  
  
  @Entity("products")
  class Products extends BaseEntity {
    @PrimaryGeneratedColumn()
    product_id!: number;
  
    @Column({
      type: "varchar",
      unique: true,
    })
    product_name!: string;
    
    @Column({
        type: "text", // Description can be a longer text
        nullable: true, // Nullable if descriptions are optional
    })
    description?: string;
    
    @Column({
        type: "varchar",
        nullable: true, // Nullable if not all products have a category
    })
    category?: string;
    
    @Column({
        type: "decimal",
        precision: 10, // Adjust precision and scale based on your needs
        scale: 2,
    })
    price!: number;
    
    @Column({
        type: "integer",
    })
    quantity!: number;
    
    @Column({
        type: "jsonb", // Store specifications as JSONB for flexibility
        nullable: true, // Nullable if not all products have specifications
    })
    specifications?: Record<string, unknown>;
    
    @Column({
        type:"enum",
        enum:ProductStatus,
        default:ProductStatus.AVAILABLE
    })
    product_status!:ProductStatus
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToMany((type) => Discount,{
      cascade: true,
    })
    @JoinTable({
      name: "ProductDiscount",
      joinColumn: {
        name: "products",
        referencedColumnName: 'product_id'
      },
      inverseJoinColumn: {
        name: "discount",
        referencedColumnName: 'discount_id'
      }
    })
    discounts!: Discount[];

  }
  
  export { Products };
  