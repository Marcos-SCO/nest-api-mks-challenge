import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { Redis } from 'ioredis';
import { User } from 'src/model/user.entity';

@Injectable()
export class UsersService {
  private readonly redis: Redis;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }

  async create(user: User): Promise<User> {
    await this.redis.set(`user:${user.id}`, JSON.stringify(user));
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const cachedUser = await this.redis.get(`user:${id}`);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    await this.redis.set(`user:${id}`, JSON.stringify(user));
    return user;
  }

  async update(id: number, user: User): Promise<void> {
    await this.redis.set(`user:${id}`, JSON.stringify(user));
    await this.usersRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.redis.del(`user:${id}`);
    await this.usersRepository.delete(id);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { username, password } });
    
    return user || null;
  }
}
