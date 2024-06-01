import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from '../model/user.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersFactoryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) { }

  async getUsersArray(count: number) {
    const users: any = [];

    for (let i = 0; i < count; i++) {
      users.push({
        username: faker.internet.userName(),
        password: 'password',
      });
    }

    return users;
  }

  async resetAutoIncrement(tableName: string): Promise<void> {
    try {
      await this.entityManager.query(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1`);
    } catch (error) {
      throw new Error(`Error resetting auto-increment: ${error.message}`);
    }
  }

  async removeUsers(): Promise<void> {
    await this.resetAutoIncrement('users');

    try {
      // Remove all users from the database
      await this.userRepository.clear();
    } catch (error) {
      throw new Error(`Error removing users: ${error.message}`);
    }
  }

  async generateUsers(count: number): Promise<void> {
    return await this.removeUsers()
      .then(async () => {
        const users: any = await this.getUsersArray(count);
        return await this.userRepository.save(users);
      });
  }
}
