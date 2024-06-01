import { Injectable, BadRequestException, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
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
    private repo: Repository<User>,
    private redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }

  public async isItemDuplicate(item: Partial<any>): Promise<boolean> {
    const existingItem = await this.repo.findOne({ where: { ...item } });

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

    return this.repo.save(user);
  }

  async getAll(): Promise<User[]> {
    return this.repo.find();
  }

  async getAllPaginated(page: number = 1, limit: number = 10): Promise<User[]> {
    const offset = (page - 1) * limit;

    return await this.repo.find({
      skip: offset,
      take: limit,
    });
  }

  async getOne(id: number): Promise<User> {
    const cachedUser = await this.redis.get(`user:${id}`);

    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const user = await this.repo.findOne({ where: { id } });

    await this.redis.set(`user:${id}`, JSON.stringify(user));

    return user;
  }

  public async updateItem(updateData: User): Promise<any> {
    this.logger.debug(`Updating User : ${updateData}`);

    const userId = updateData?.id;
    const passwordData = updateData?.password;

    if (!userId) throw new BadRequestException(`User id param is missing`);

    const existingUser = await this.repo.findOne({ where: { id: userId } });

    if (!existingUser) throw new NotFoundException(`Item with id ${userId} don\'t exists`);

    if (passwordData) {
      const saltRounds = 10;

      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    const updateUser = Object.assign(existingUser, updateData);
    updateUser.id = +userId;

    try {

      const updatedItem = await this.repo.save(updateUser);

      return updatedItem;

    } catch (error) {

      throw new BadRequestException('Failed to update user');
    }

  }

  async delete(id: number): Promise<void> {
    const idValue = +id;

    if (!idValue) {
      const errorMessage = 'Id param is missing...';
      this.logger.error(errorMessage);

      throw new NotAcceptableException(errorMessage);
    }

    const idItemExists = await this.repo.findOne({ where: { id: idValue } });

    if (!idItemExists) {
      const itemExistsError = `item id ${idValue} don\'t exists`;
      this.logger.error(itemExistsError);

      throw new NotFoundException(itemExistsError);
    }

    try {
      await this.redis.del(`user:${idValue}`);
      await this.repo.delete(idValue);

    } catch (error) {

      throw new BadRequestException(`Failed to delete with id: ${idValue} movie`);
    }
  }

  async validateUser(username: string, password: string): Promise<User | null> {

    const user = await this.repo.findOne({ where: { username } });

    if (!user) return null;

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) return null;

    return user;

  }
}
