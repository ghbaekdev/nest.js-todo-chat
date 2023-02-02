import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardRepository } from './board.repository';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { AuthModule } from 'src/auth/auth.module';
import { LikeRepository } from './like.repository';

import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository, LikeRepository]),
    AuthModule,
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
