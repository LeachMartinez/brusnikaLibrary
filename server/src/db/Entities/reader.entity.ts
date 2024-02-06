import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Reader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Book, (book) => book.reader, {
    cascade: true,
    onDelete: 'DEFAULT',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  books: Book[];
}
