import { IsNotEmpty } from 'class-validator';
import { User } from 'src/repository';

export class LoginData implements Pick<User, 'login' | 'password'> {
  @IsNotEmpty()
  readonly login: string;

  @IsNotEmpty()
  readonly password: string;
}
