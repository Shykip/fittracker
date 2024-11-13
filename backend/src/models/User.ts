import { BaseEntity, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { FitnessRecord } from "./FitnessRecord"
import { Group } from "./Group"


@Entity('user')
export class User extends BaseEntity{

    @OneToMany(() => FitnessRecord, (fitnessRecord) => fitnessRecord.user)
    fitnessRecord: FitnessRecord[]

    
    @ManyToOne(() => Group, (group) => group.user, { onDelete: "SET NULL" })
    @JoinColumn({name: 'group_id', referencedColumnName: 'id'})
    group: Group


    @PrimaryGeneratedColumn()
    id: number


    @CreateDateColumn()
    created_at: Date


    @UpdateDateColumn()
    updated_at: Date


    @Column({ type: 'varchar', length: 50 })
    full_name: string


    @Column({ type: 'date' })
    date_of_birth: Date


    @Column({ type: 'varchar', length: 6})
    gender: string


    @Column({ type: 'varchar', length: 100, unique: true })
    email: string


    @Column({ type: 'varchar', length: 255 })
    password: string


    @Column({ type: 'decimal', precision: 4, scale: 2 })
    weight: number


    @Column({ type: 'decimal', precision: 4, scale: 2 })
    height: number


    @Column({ type: 'text' })
    interested_in: string


    @Column({ type: 'boolean' })
    isAdmin: boolean
    

    @Column({ type: 'varchar', length: 255, default: '["cardio"]' })
    tags: string
}