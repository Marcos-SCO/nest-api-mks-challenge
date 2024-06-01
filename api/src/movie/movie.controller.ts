import { BadRequestException, Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common/decorators';
import { MovieDto } from './movie.dto';

@Controller('movies')
export class MovieController {
  logger = new Logger(MovieController.name);

  constructor(private movieService: MovieService) { }

  @Get('/')
  public async index(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    this.logger.debug(`Get all movies with pagination - Page: ${page}, Limit: ${limit}`);

    const results = await this.movieService.getAllPaginated(page, limit);

    const foundResults = results && results.length > 0;

    if (!foundResults) {

      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'No results found...',
      }, HttpStatus.NOT_FOUND)
    }

    return results;
  }

  @Get('show/:id')
  public async show(@Param() params: any): Promise<any> {
    this.logger.debug('Show a movie');

    const paramId = params?.id;

    const results = await this.movieService.getOne(paramId);;

    if (!results) {

      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'No results found...',
      }, HttpStatus.NOT_FOUND)
    }

    return results;
  }

  @Post()
  public async store(@Body() itemBody: MovieDto) {
    const results: any = await this.movieService.save(itemBody);
    const errorResult = results?.error;

    if (errorResult) {

      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: results?.message,
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    return results;
  }
  
  @Put()
  public async update(@Body() itemBody) {
    const results: any = await this.movieService.updateItem(itemBody);
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

    const results: any = await this.movieService.delete(paramId);
    const errorResult = results?.error;
    const errorStatus = results?.status || HttpStatus.FORBIDDEN;

    if (errorResult) {

      throw new HttpException({
        status: errorStatus,
        error: results?.message,
      }, errorStatus)
    }

    return {
      'message': 'Item was deleted successfully',
    };
  }
}
