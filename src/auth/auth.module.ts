import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './aurh.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import 'dotenv/config';
import { RepositoryModule } from 'src/repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    RepositoryModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class AuthModule {}
