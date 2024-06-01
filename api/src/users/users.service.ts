import { Injectable, BadRequestException, Logger, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { Redis } from 'ioredis';
import { User } from 'src/model/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly redis: Redis;
  logger = new Logger();

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }

  public async isItemDuplicate(item: Partial<any>): Promise<boolean> {
    const existingItem = await this.usersRepository.findOne({ where: { ...item } });

    return !!existingItem; // If existingItem is not null, it means the item is duplicate
  }

  async create(user: User): Promise<User> {
    const username = user?.username;
    const userPassword = user?.password;

    if (!username) throw new BadRequestException('username is missing...');

    if (!userPassword) throw new BadRequestException('User password is missing...');

    const userAlreadyExists = await this.isItemDuplicate({ username: username });

    if (userAlreadyExists) throw new NotAcceptableException(`username: ${username} is already taken`);

    // Hash the password before saving
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);

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
    
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) return null;

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) return null;

    return user;

  }
}
