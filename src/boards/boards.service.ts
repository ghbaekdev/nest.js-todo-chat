import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { LikeRepository } from './like.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { Between } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    @InjectRepository(LikeRepository)
    private likeRepository: LikeRepository,
  ) {}

  async handleUpdate(id: number) {
    const qb = await this.boardRepository.createQueryBuilder();
    const result = await this.likeRepository
      .createQueryBuilder()
      .select('COUNT(userId)', 'count')
      .where('boardId= :id', { id: id })
      .getRawOne();
    await qb
      .update(Board)
      .set({ likeCnt: () => result.count })
      .where('id = :id', { id: id })
      .execute();
  }

  async updateLikeCount(id: number, user: User) {
    const found = await this.likeRepository.findOneBy({
      boardId: id,
      userId: user.id,
    });
    if (found) {
      await this.likeRepository.delete({
        userId: found.userId,
        boardId: found.boardId,
      });
      this.handleUpdate(id);
    } else {
      await this.likeRepository.createLike(id, user);
      this.handleUpdate(id);
    }
  }

  async getFilterBoard(user: User, data: any): Promise<Board[]> {
    const result = await this.boardRepository.find({
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
          data['start-date'] && data['end-date']
            ? Between(new Date(data['start-date']), new Date(data['end-date']))
            : null,
        user: { id: user.id },
      },
      skip: data['page'] ? (data['page'] - 1) * 2 : 0,
      take: 2,
    });

    return result;
  }

  async getAllBoard(user: User): Promise<Board[]> {
    const result = await this.boardRepository.find({
      where: {
        user: { id: user.id },
      },
    });
    return result;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`${id} 이 아이디는 없어.`);
    }
    return found;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`이 아이디는 찾을수 없음.${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async updateBoardComplete(id: number, completed: boolean): Promise<Board> {
    const board = await this.getBoardById(id);
    board.completed = completed;
    return board;
  }
}
