import{Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable} from "typeorm";

@Entity()
export class Permission{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @ManyToMany(() => Permission) 
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {name: 'role_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}
    })
    permissions: Permission[];
} 
