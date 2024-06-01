import { HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { Movie } from 'src/model/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieDto } from './movie.dto';

@Injectable()
export class MovieService {
  logger = new Logger(MovieService.name);

  constructor(@InjectRepository(Movie) private readonly repo: Repository<Movie>) { }

  public async getAll() {
    return await this.repo.find();
  }

  async getAllPaginated(page: number = 1, limit: number = 10): Promise<Movie[]> {
    const offset = (page - 1) * limit;

    return await this.repo.find({
      skip: offset,
      take: limit,
    });
  }

  public async getOne(id: string | number) {
    const idValue = +id;

    if (!idValue) return this.logger.error('Id param is missing...');

    this.logger.debug(`Find movie with id: ${idValue}`);
    return await this.repo.findOne({
      where: { id: idValue }
    });
  }

  public async getItemByName(name: string): Promise<any> {
    const existingItem = await this.repo.findOne({ where: { name } });
    return existingItem;
  }

  public async isItemDuplicate(item: Partial<any>): Promise<boolean> {
    const existingItem = await this.repo.findOne({ where: { ...item } });

    return !!existingItem; // If existingItem is not null, it means the item is duplicate
  }

  public async save(movie: MovieDto) {
    this.logger.debug(`Saving Movie : ${movie}`);

    const movieName = movie?.name;
    const movieAuthor = movie?.author;

    if (!movieName) return { 'error': true, 'message': 'Movie name param is missing' };

    if (!movieAuthor) return { 'error': true, 'message': 'Movie author param is missing' };

    const haveItemName = await this.isItemDuplicate({ name: movieName, author: movieAuthor });

    if (haveItemName) return { 'error': true, 'message': 'Item already exists' };

    try {

      const savedItem = await this.repo.save(movie);

      return savedItem;

    } catch (error) {

      return { 'error': true, 'message': error.message }
    }

  }

  public async updateItem(updateData: MovieDto | any) {
    this.logger.debug(`Updating Movie : ${updateData}`);

    const movieId = updateData?.id;

    if (!movieId) return { 'error': true, 'message': 'Movie id param is missing' };

    const existingMovie = await this.repo.findOne({ where: { id: movieId } });

    if (!existingMovie) return { 'status': HttpStatus.NOT_FOUND, 'error': true, 'message': `Item with id ${movieId} don\'t exists` };

    const updateMovie = Object.assign(existingMovie, updateData);
    updateMovie.id = +movieId;

    try {
      
      const updatedItem = await this.repo.save(updateMovie);

      return updatedItem;

    } catch (error) {

      return { 'status': error.status, 'error': true, 'message': error.message }
    }

  }

  public async delete(id: number | string) {
    const idValue = +id;

    if (!idValue) {
      const errorMessage = 'Id param is missing...';
      this.logger.error(errorMessage);

      return { 'status': HttpStatus.NOT_ACCEPTABLE, 'error': true, 'message': errorMessage }
    }

    this.logger.debug(`Deleting Movie with id : ${idValue}`);

    const idItemExists = await this.repo.findOne({ where: { id: idValue } });

    if (!idItemExists) {
      const itemExistsError = `item id ${idValue} don\'t exists`;
      this.logger.error(itemExistsError);

      return { 'status': HttpStatus.NOT_FOUND, 'error': true, 'message': itemExistsError };
    }

    try {

      return await this.repo.delete(idValue);

    } catch (error) {
      return { 'error': true, 'message': error.message }
    }
  }

}
