import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      secret: '1234',
      signOptions: {
        expiresIn: 60 * 60 * 60,
      },
    }),
    // jwt모듈 설정 secret키 및 유효기간 지정
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // 프로바이더에 jwtstrategy를 넣어줘야함.
  exports: [JwtStrategy, PassportModule],
  //다른 모듈에서도 사용하기 위함
})
export class AuthModule {}
