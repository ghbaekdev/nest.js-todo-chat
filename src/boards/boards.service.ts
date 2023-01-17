import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { Between } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoard(user: User, date: any): Promise<Board[]> {
    //query는 board에 접근
    // const query = this.boardRepository.createQueryBuilder('board');
    // query.where('board.userId= :userId', { userId: user.id });
    // const boards = await query.getMany();
    // return boards;

    const data = await this.boardRepository.find({
      select: {
        user: {
          id: true,
          username: true,
          boards: false,
        },
      },
      relations: {
        user: true,
      },
      where: {
        createdAt:
          date['start-date'] && date['end-date']
            ? Between(new Date(date['start-date']), new Date(date['end-date']))
            : null,
        user: { id: user.id },
      },
    });

    return data;
  }

  // async getDate() {
  //   const result = await this.boardRepository.find({
  //     where: {
  //       createdAt: Between(new Date('2023-01-17 07:05:00'), new Date()),
  //     },
  //   });
  //   return result;
  // }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`${id} 이 아이디는 없어.`);
    }
    return found;
  }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException('아이디 틀렸어');
  //   }
  //   return found;
  // }
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // async getBoardList(): Promise<Board[]> {
  //   return await this.boardRepository
  // }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`이 아이디는 찾을수 없음.${id}`);
    }
  }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
