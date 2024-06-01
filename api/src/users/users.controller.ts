// user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, NotFoundException, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // Import the JwtAuthGuard

import { UsersService } from './users.service';
import { User } from 'src/model/user.entity';

import { UsersFactoryService } from './users.factory.service';

@Controller('users')
export class UsersController {
  logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService, private usersFactoryService: UsersFactoryService) { }

  @Post()
  public async store(@Body() user: User): Promise<User> {
    const results: any = await this.usersService.create(user);
    const errorResult = results?.error;

    if (errorResult) {

      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: results?.message,
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    return results;
  }

  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to protect this endpoint
  @Get('/')
  public async index(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    this.logger.debug(`Get all users with pagination - Page: ${page}, Limit: ${limit}`);

    const results = await this.usersService.getAllPaginated(page, limit);

    const foundResults = results && results.length > 0;

    if (!foundResults) throw new NotFoundException('No results found...');

    return results;
  }

  @UseGuards(JwtAuthGuard)
  @Get('show/:id')
  public async show(@Param() params: any): Promise<any> {
    this.logger.debug('Show a user');

    const paramId = params?.id;

    const results = await this.usersService.getOne(paramId);;

    if (!results) throw new NotFoundException(`User with Id ${paramId} not found`);

    return results;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  public async update(@Body() itemBody) {
    const results: any = await this.usersService.updateItem(itemBody);
    const errorResult = results?.error;

    if (errorResult) {

      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: results?.message,
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    return results;
  }

  @Delete()
  public async destroy(@Body() itemBody: any): Promise<any> {
    const paramId = itemBody?.id;

    const results: any = await this.usersService.delete(+paramId);
    const errorResult = results?.error;
    const errorStatus = results?.status || HttpStatus.FORBIDDEN;

    if (errorResult) {

      throw new HttpException({
        status: errorStatus,
        error: results?.message,
      }, errorStatus)
    }

    return { 'message': 'Item was deleted successfully', };
  }

  @Post('factory/generate')
  public async generateUsers() {
    const count = 30; // Number of users to generate

    const createdUsersData = await this.usersFactoryService.generateUsers(count);

    return { message: `${count} users generated successfully`, data: createdUsersData };
  }
}
