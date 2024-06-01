import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    const token = await this.authService.login(username, password);
    
    if (!token) return { message: 'Invalid username or password' };
    
    return { token };
  }
}
