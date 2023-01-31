import {Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import{Order} from './order.entity'

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    price: number;

    @Column()
    quanity: number;

    @CreateDateColumn()
    created_at: string;

    @ManyToOne( () => Order)
    @JoinColumn({name: 'order_id'})
    order: Order;
}