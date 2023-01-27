import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';
import { HistoryStatus } from './status.enum';

@Entity()
export class History extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  createdAt: Date;

  @Column()
  status: HistoryStatus;

  @ManyToMany(() => User, (user) => user.username, { eager: false })
  user: User;

  @ManyToMany(() => Board, { eager: false })
  board: Board;
}
