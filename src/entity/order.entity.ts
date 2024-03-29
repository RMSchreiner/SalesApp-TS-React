import {Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, UpdateDateColumn} from "typeorm";
import {OrderItem} from "./order-item.entity";

@Entity()
export class Order{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  created_at: string;

  @OneToMany( () => OrderItem, orderItem => orderItem.order)
  order_items: OrderItem[];

  get name(): string {
    return `${this.first_name} ${this.last_name}`
  }

  get total(): number {
    return this.order_items.reduce((sum:number, item:OrderItem) => sum + item.quantity * item.price, 0);
  }
}
