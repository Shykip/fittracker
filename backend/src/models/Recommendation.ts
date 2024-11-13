import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm"


@Entity('recommendation')
export class Recommendation extends BaseEntity{

    @CreateDateColumn()
    created_at: Date


    @PrimaryGeneratedColumn()
    id: number


    @Column({ type: 'varchar', length: 50 })
    content_name: string


    @Column({ type: 'text' })
    description: string


    @Column({ type: 'tinyint' })
    time_min: number


    @Column({ type: 'text' })
    tags: string

}