import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: any;

  @Column({ default: false })
  completed: boolean;

  //보드가져올때 유저 가져올필요 없으니 eager false
  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
