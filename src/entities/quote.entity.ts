import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Vote } from './vote.entity';

@Entity()
export class Quote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quote: string;

  //relation
  @OneToMany(() => Vote, (vote) => vote.quote)
  votes: Vote[];

  @ManyToOne(() => User, (user) => user.quote)
  @Exclude({ toPlainOnly: true })
  user: User;
}