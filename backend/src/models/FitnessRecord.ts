import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"
import { Activity } from "./Activity"


@Entity('fitness_record')
export class FitnessRecord extends BaseEntity{


    @ManyToOne(() => Activity, (activity) => activity.fitnessRecord, { onDelete: "SET NULL" })
    @JoinColumn({name: 'activity_id', referencedColumnName: 'id'})
    activity: Activity


    @ManyToOne(() => User, (user) => user.fitnessRecord, { onDelete: "SET NULL" })
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User


    @PrimaryGeneratedColumn()
    id: number


    @Column({ type: 'date' })
    activity_date: Date


    @Column({ type: 'int' })
    duration_min: number


    @Column({ type: 'decimal', precision: 7, scale: 2 })
    calories_burnt: number

}