import { Movie } from './../model/movie.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

// import * as faker from 'faker';factory/generate

@Injectable()
export class MovieFactoryService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private readonly entityManager: EntityManager
  ) { }

  async getMoviesArray() {
    const movies = [
      {
        name: "Power Rangers",
        image_url: "https://i.pinimg.com/564x/03/86/ab/0386ab1ac10216ae0a7b6ebd964a4852.jpg",
        author: "Dean Israelite",
        release_date_time: new Date("2017-03-24"),
      },
      {
        name: "The Shawshank Redemption",
        image_url: "https://i.pinimg.com/564x/08/6f/fe/086ffeccab22baa2b4d49ab8787f9b90.jpg",
        author: "Frank Darabont",
        release_date_time: new Date("1994-09-23"),
      },
      {
        name: "The Godfather",
        image_url: "https://i.pinimg.com/564x/11/99/dc/1199dc6273680f175fd9b06c9c36d08a.jpg",
        author: "Francis Ford Coppola",
        release_date_time: new Date("1972-03-24"),
      },
      {
        name: "The Dark Knight",
        image_url: "https://i.pinimg.com/564x/c3/86/7d/c3867dbf263b1866980aa1a1f1d658ac.jpg",
        author: "Christopher Nolan",
        release_date_time: new Date("2008-07-18"),
      },
      {
        name: "Schindler's List",
        image_url: "https://i.pinimg.com/564x/13/02/87/13028772877730c95e5d5e14187b5cae.jpg",
        author: "Steven Spielberg",
        release_date_time: new Date("1993-12-15"),
      },
      {
        name: "Forrest Gump",
        image_url: "https://i.pinimg.com/564x/13/98/2a/13982aedfb82420cbcf1b44f616539f4.jpg",
        author: "Robert Zemeckis",
        release_date_time: new Date("1994-07-06"),
      },
      {
        name: "Inception",
        image_url: "https://i.pinimg.com/564x/59/5c/4e/595c4ea9f9398bcd79505e8fb51de9ea.jpg",
        author: "Christopher Nolan",
        release_date_time: new Date("2010-07-16"),
      },
      {
        name: "The Matrix",
        image_url: "https://i.pinimg.com/564x/62/f2/41/62f241fd34d94f303a71df7fc7274fbb.jpg",
        author: "The Wachowskis",
        release_date_time: new Date("1999-03-31"),
      },
      {
        name: "Pulp Fiction",
        image_url: "https://i.pinimg.com/564x/32/6c/1c/326c1cd5cd6b79811ed2a924f20fc388.jpg",
        author: "Quentin Tarantino",
        release_date_time: new Date("1994-10-14"),
      },
      {
        name: "The Lord of the Rings: The Return of the King",
        image_url: "https://i.pinimg.com/564x/82/f9/6f/82f96f7365fd9ea079acaeb38f6cbe9f.jpg",
        author: "Peter Jackson",
        release_date_time: new Date("2003-12-17"),
      },
      {
        name: "Fight Club",
        image_url: "https://i.pinimg.com/564x/fa/87/5e/fa875e285040808200c575687cb81d44.jpg",
        author: "David Fincher",
        release_date_time: new Date("1999-10-15"),
      },
      {
        name: "Forrest Gump",
        image_url: "https://example.com/forrest_gump.jpg",
        author: "Robert Zemeckis",
        release_date_time: new Date("1994-07-06"),
      },
      {
        name: "The Dark Knight Rises",
        image_url: "https://example.com/dark_knight_rises.jpg",
        author: "Christopher Nolan",
        release_date_time: new Date("2012-07-20"),
      },
      {
        name: "The Shawshank Redemption",
        image_url: "https://example.com/shawshank_redemption.jpg",
        author: "Frank Darabont",
        release_date_time: new Date("1994-09-23"),
      },
      {
        name: "Inception",
        image_url: "https://example.com/inception.jpg",
        author: "Christopher Nolan",
        release_date_time: new Date("2010-07-16"),
      },
      {
        name: "The Godfather",
        image_url: "https://example.com/the_godfather.jpg",
        author: "Francis Ford Coppola",
        release_date_time: new Date("1972-03-24"),
      },
      {
        name: "The Lord of the Rings: The Fellowship of the Ring",
        image_url: "https://example.com/lotr_fellowship_of_the_ring.jpg",
        author: "Peter Jackson",
        release_date_time: new Date("2001-12-19"),
      },
      {
        name: "The Godfather: Part II",
        image_url: "https://example.com/the_godfather_part_ii.jpg",
        author: "Francis Ford Coppola",
        release_date_time: new Date("1974-12-20"),
      },
      {
        name: "Forrest Gump",
        image_url: "https://example.com/forrest_gump.jpg",
        author: "Robert Zemeckis",
        release_date_time: new Date("1994-07-06"),
      },
      {
        name: "The Shawshank Redemption",
        image_url: "https://example.com/shawshank_redemption.jpg",
        author: "Frank Darabont",
        release_date_time: new Date("1994-09-23"),
      },
      {
        name: "The Dark Knight",
        image_url: "https://example.com/the_dark_knight.jpg",
        author: "Christopher Nolan",
        release_date_time: new Date("2008-07-18"),
      },
      {
        name: "Pulp Fiction",
        image_url: "https://example.com/pulp_fiction.jpg",
        author: "Quentin Tarantino",
        release_date_time: new Date("1994-10-14"),
      },
      {
        name: "The Lord of the Rings: The Two Towers",
        image_url: "https://example.com/lotr_two_towers.jpg",
        author: "Peter Jackson",
        release_date_time: new Date("2002-12-18"),
      },
      {
        name: "The Departed",
        image_url: "https://example.com/the_departed.jpg",
        author: "Martin Scorsese",
        release_date_time: new Date("2006-10-06"),
      },
      {
        name: "Gladiator",
        image_url: "https://example.com/gladiator.jpg",
        author: "Ridley Scott",
        release_date_time: new Date("2000-05-05"),
      },
      {
        name: "Forrest Gump",
        image_url: "https://example.com/forrest_gump.jpg",
        author: "Robert Zemeckis",
        release_date_time: new Date("1994-07-06"),
      },
      {
        name: "Inception",
        image_url: "https://example.com/inception.jpg",
        author: "Christopher Nolan",
        release_date_time: new Date("2010-07-16"),
      },
      {
        name: "The Matrix",
        image_url: "https://example.com/the_matrix.jpg",
        author: "The Wachowskis",
        release_date_time: new Date("1999-03-31"),
      },
      {
        name: "Pulp Fiction",
        image_url: "https://example.com/pulp_fiction.jpg",
        author: "Quentin Tarantino",
        release_date_time: new Date("1994-10-14"),
      },
      {
        name: "The Lord of the Rings: The Return of the King",
        image_url: "https://example.com/lotr_return_of_the_king.jpg",
        author: "Peter Jackson",
        release_date_time: new Date("2003-12-17"),
      },
      {
        name: "Fight Club",
        image_url: "https://example.com/fight_club.jpg",
        author: "David Fincher",
        release_date_time: new Date("1999-10-15"),
      },
    ];

    return movies;
  }

  async resetAutoIncrement(tableName: string): Promise<void> {
    try {
      await this.entityManager.query(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1`);
    } catch (error) {
      throw new Error(`Error resetting auto-increment: ${error.message}`);
    }
  }

  async removeMovies(): Promise<void> {
    await this.resetAutoIncrement('movies');

    try {
      // Remove all movies from the database
      await this.movieRepository.clear();

    } catch (error) {
      throw new Error(`Error removing movies: ${error.message}`);
    }
  }

  async generateMovies(): Promise<void> {

    return await this.removeMovies()
      .then(async () => {
        const movies: any = await this.getMoviesArray();

        return await this.movieRepository.save(movies);
      });

  }

}
