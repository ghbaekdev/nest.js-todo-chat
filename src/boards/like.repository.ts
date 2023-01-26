import { User } from 'src/auth/user.entity';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@CustomRepository(Like)
export class LikeRepository extends Repository<Like> {
  async createLike(id: number, user: User): Promise<Like> {
    const like = this.create({
      boardId: Number(id),
      userId: user.id,
    });
    await this.save(like);
    return like;
  }
}
