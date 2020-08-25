import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import ModelProfile from './ModelProfile';

@Entity('functionalities')
class ModelFunctionalities {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    profile: string;

    @ManyToOne(() => ModelProfile)
    @JoinColumn({ name: 'profile' })
    nameProfile: ModelProfile;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default ModelFunctionalities;
