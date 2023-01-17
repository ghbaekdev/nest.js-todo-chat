import { AuthCredentialsDto } from './dto/create-auth.dto';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      console.log('error', error);
      // username exist 에러코드 23505
      if (error.code === '23505') {
        throw new ConflictException('이미 있는 유저네임.');
      } else {
        throw new InternalServerErrorException();
      }
    }

    await this.save(user);
  }
}
