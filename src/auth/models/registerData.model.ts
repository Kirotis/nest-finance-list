import { IsNotEmpty, MaxLength } from 'class-validator';
import { RegisterUser } from 'src/repository';
import { LoginData } from './loginData.model';

export class RegisterData extends LoginData implements RegisterUser {
  @MaxLength(100)
  // @IsNotEmpty()
  readonly description: string;

  readonly avatarImage?: string;
}
