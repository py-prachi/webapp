import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
 
} from "typeorm";
import { ProductOrders } from "./ProductOrders";

enum order_status {
    PENDING = "pending",
    COMPLETED = "completed",
  }

@Entity("orders")
class Orders {
  @PrimaryGeneratedColumn()
  order_id!: number;

  @Column({
    type: "int",
  })
  user_id!: number;

  @Column({
    type: "varchar",
    length: 20,
  })
  shipping_address!: string;

  @Column({ 
    type: "varchar",
    length: 10 
})
  contact_number!: string;

  @Column({ 
    type: "varchar",
    length: 16 
})
  card_number!: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  total_amount!: number;

  @Column({ 
    type: 'date' 
})
  orderDate!: Date;

  @Column({
    type: 'enum',
    enum: order_status,
    default: order_status.PENDING,
  })
  order_status!: order_status;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(() => ProductOrders, (productOrder) => productOrder.order)
  productOrders!: ProductOrders[];
  
}

export { Orders,order_status };
