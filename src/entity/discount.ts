import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,  
    ManyToMany
  } from "typeorm";
  
  import { Entity } from "typeorm";
import { Products } from "./Products";

  enum DiscountType {
    FLAT = "flat",
    PERCENT = "percent"
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
        type:"enum",
        enum:DiscountType,
        default:DiscountType.FLAT,
    })
    discount_type!:DiscountType

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
    })
    discount_rate!: number;
   

    @Column({
		name: 'is_active',
        type: 'boolean',
		default: false,
	})
	status: boolean | undefined;
  
    @Column({ 
        type: 'timestamp' 
    })
    startDate: Date | undefined;

  @Column({ 
    type: 'timestamp' 
    })
    endDate: Date | undefined;
    @ManyToMany((type) => Products,{
        cascade : true,
    })
      products!: Products[];
}
  
  export { Discount };
  