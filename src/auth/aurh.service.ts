import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService, RegisterUser, User } from 'src/repository';

export type TokenObject = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserRepositoryService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: RegisterUser) {
    const haveUser = await this.userService.getUserByLogin(user.login);
    if (haveUser) {
      return Promise.resolve('This login was registred');
    }
    const registerUser = await this.userService.createUser(user);
    return this.getToken(registerUser);
  }

  async login(login: string, passport: string) {
    const user = await this.userService.getUserByLogin(login);
    if (user?.password === passport) {
      return this.getToken(user);
    }
    return Promise.resolve('Not correct login or password');
  }

  private getToken(user: User): TokenObject {
    const payload = { username: user.login, sub: user.id || user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
