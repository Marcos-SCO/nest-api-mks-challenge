import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RedisModule } from '../redis/redis.module';
import { UsersFactoryService } from './users.factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule],
  providers: [UsersService, UsersFactoryService],
  controllers: [UsersController],
  exports: [UsersService], // Export UsersService to be used in other modules
})
export class UsersModule {}