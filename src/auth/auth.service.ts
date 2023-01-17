import { AuthCredentialsDto } from './dto/create-auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwetService: JwtService,
  ) {}

  //   async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //     const { username, password } = authCredentialsDto;
  //     const user = this.create({ username, password });
  //     await this.save(user);
  //   }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      // jwt 발급 (secret + payload가 필요함 secret은 모듈에서 설정했으니 payload만 설정)
      const payload = { username };
      const accessToken = await this.jwetService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
