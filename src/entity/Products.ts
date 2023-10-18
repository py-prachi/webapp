import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn  
  } from "typeorm";
  
import { Entity } from "typeorm";
import { Cart } from "./Cart";


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
        type: "decimal",
        precision: 10, 
        scale: 2,
    })
    price!: number;
    
    @Column({
        type: "integer",
    })
    quantity!: number;
    
    @Column({
        type: "jsonb", 
        nullable: true, 
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
      productDiscount: any;
      cart: any;
    
    

  }
  
  export { Products };
  