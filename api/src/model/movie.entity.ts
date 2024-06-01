import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';

@Entity({name: 'movies'})
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', length: 300})
  name: string;

  @Column({type: 'varchar', length: 300})
  author: string;

  @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
  release_date_time: Date;

  @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;
  
  @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: "CURRENT_TIMESTAMP"})
  updated_at: Date;

}