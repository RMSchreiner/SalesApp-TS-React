import {Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm";
import{Order} from './order.entity'

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    product_title: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @CreateDateColumn()
    created_at: string;

    @ManyToOne( () => Order)
    @JoinColumn({name: 'order_id'})
    order: Order;
}