import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardRepository } from './board.repository';
import { TypeOrmExModule } from 'src/configs/typeorm.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardRepository])],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
