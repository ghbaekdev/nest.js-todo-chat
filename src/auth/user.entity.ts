import { Board } from 'src/boards/board.entity';
// import { History } from 'src/boards/history.entity';
import { Like } from 'src/boards/like.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
  // eager 유저를 가져올때 보드도 가져옴.
  @OneToMany((type) => Board, (board) => board.user, { eager: false })
  boards: Board[];

  @ManyToMany((type) => Like, { eager: false })
  like: Like;

  // @ManyToMany(() => History)
  // history: History;
}
