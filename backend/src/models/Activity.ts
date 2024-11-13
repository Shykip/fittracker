import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany } from "typeorm";
import { FitnessRecord } from "./FitnessRecord";

@Entity('activity')
export class Activity extends BaseEntity {

    @OneToMany(() => FitnessRecord, (fitnessRecord) => fitnessRecord.activity)
    fitnessRecord: FitnessRecord[];


    @CreateDateColumn()
    created_at: Date;


    @PrimaryGeneratedColumn()
    id: number;


    @Column({ type: 'varchar', length: 25 })
    activity_name: string;


    @Column({ type: 'varchar', length: 255 })
    image_name: string;


    @Column({ type: 'decimal', precision: 5, scale: 2 })
    met_value: number;


    @Column({ type: 'varchar', length: 255 })
    tag: string;
}
