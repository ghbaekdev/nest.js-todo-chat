import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.dacorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  //   boardsService: BoardsService;
  //   constructor(boards Service: BoardsService) {
  //     this.boardsService = boardsService;
  //   }
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(@Query() date: any, @GetUser() user: User) {
    if (!(date['start-date'] | date['page'])) {
      return this.boardsService.getAllBoard(user);
    } else {
      return this.boardsService.getFilterBoard(user, date);
    }
  }
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): void {
    this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    this.boardsService.updateBoardStatus(id, status);
  }

  @Patch('/:id/complete')
  updateBoardComplete(
    @Param('id') id: number,
    @Body('completed') completed: boolean,
  ) {
    this.boardsService.updateBoardComplete(id, completed);
  }
  @Post('/:id/like')
  updateLikeCount(@Param('id') id: number, @GetUser() user: User): void {
    this.boardsService.updateLikeCount(id, user);
  }
}
