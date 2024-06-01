import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    
    const redisUrl = this.configService.get<string>('REDIS_URL');
    
    const redisPassword = this.configService.get<string>('REDIS_PASSWORD');

    this.client = new Redis(redisUrl, {
      password: redisPassword,
    });

    // Optionally, handle client connection errors
    this.client.on('error', (error) => {
      console.error('Redis connection error:', error);
    });
  }

  getClient(): Redis {
    return this.client;
  }

  async storeToken(key: string, token: string): Promise<any> {
    return await this.client.set(key, token, 'EX', 3600); // Use 'EX' for seconds
  }

  async retrieveToken(key: string): Promise<string | null> {
    return await this.client.get(key); // Retrieve token from Redis
  }

  async deleteToken(key: string): Promise<any> {
    return await this.client.del(key); // Delete token from Redis
  }
}
