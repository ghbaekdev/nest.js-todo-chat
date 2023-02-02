import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './status.enum';
// import { History } from './history.entity';
import { Like } from './like.entity';

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
  createdAt: Date;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 0 })
  likeCnt: number;
  //보드가져올때 유저 가져올필요 없으니 eager false
  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;

  @ManyToMany(() => Like, (like) => like.boardId)
  like: Like;

  // @ManyToMany(() => History)
  // history: History;
}
