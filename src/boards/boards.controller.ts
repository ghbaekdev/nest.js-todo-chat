import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  //   boardsService: BoardsService;
  //   constructor(boards Service: BoardsService) {
  //     this.boardsService = boardsService;
  //   }
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard() {
    return this.boardsService.getAllBoard();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    this.boardsService.updateBoardStatus(id, status);
  }
}
