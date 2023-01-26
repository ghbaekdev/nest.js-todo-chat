import { Column } from 'typeorm';
import { User } from 'src/auth/user.entity';

import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.id, { eager: false })
  @JoinTable()
  @Column()
  userId: number;

  @ManyToMany(() => Board, (board) => board.id, { eager: false })
  @Column({ type: 'bigint' })
  @JoinTable()
  boardId: number;
}
