import { BadGatewayException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }

  async login(username: string, password: string): Promise<string | null> {

    if (!username) throw new BadGatewayException('username param is missing...');
    
    if (!password) throw new BadGatewayException('password param is missing...');

    const user = await this.usersService.validateUser(username, password);

    if (!user) return null;

    const payload = { username: user.username, sub: user.id };

    return this.jwtService.sign(payload);

  }
}
