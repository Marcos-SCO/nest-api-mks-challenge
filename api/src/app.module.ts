import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';

import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config/configuration';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.dbname'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Don't use this option for prod mode
        keepConnectionAlive: true,
        timezone: 'UTC',
        ssl: configService.get('database.ssl'),
        extra: configService.get('database.ssl') ? {
          ssl: {
            rejectUnauthorized: false
          }
        } : null,
        autoLoadEntities: true
      }),
      inject: [ConfigService]
    }),
  
    MovieModule,

    UsersModule,

    AuthModule,

    RedisModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }