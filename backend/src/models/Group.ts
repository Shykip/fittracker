import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User"


@Entity('group')
export class Group extends BaseEntity{

    @OneToMany(() => User, (user) => user.group)
    user: User[]


    @OneToOne(() => User)
    @JoinColumn({name: 'leader_id', referencedColumnName: 'id'})
    leader: User


    @CreateDateColumn()
    created_at: Date


    @PrimaryGeneratedColumn()
    id: number


    @Column({ type: 'varchar', length: 50 })
    group_name: string


    @Column({ type: 'varchar', length: 100 })
    invite_code: string

}