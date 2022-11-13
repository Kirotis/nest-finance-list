import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserRepositoryService } from 'src/repository';
import { AuthService } from './aurh.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LoginData } from './models/loginData.model';
import { RegisterData } from './models/registerData.model';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserRepositoryService,
  ) {}

  @Post('login')
  async login(@Body() loginData: LoginData) {
    return this.authService.login(loginData.login, loginData.password);
  }

  @Post('reg')
  async registUser(@Body() registerData: RegisterData) {
    return this.authService.register(registerData);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.userService.getUserById(req.user?.id);
  }
}
