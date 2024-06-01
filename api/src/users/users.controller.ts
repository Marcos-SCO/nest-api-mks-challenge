// user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // Import the JwtAuthGuard

import { UsersService } from './users.service';
import { User } from 'src/model/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to protect this endpoint
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to protect this endpoint
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to protect this endpoint
  @Put(':id')
  update(@Param('id') id: string, @Body() user: User): Promise<void> {
    return this.usersService.update(+id, user);
  }

  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to protect this endpoint
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
