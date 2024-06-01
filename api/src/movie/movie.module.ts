import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/model/movie.entity';
import { MovieFactoryService } from './movie.factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieRepository, MovieService, MovieFactoryService],
  exports: [MovieService]
})

export class MovieModule { }