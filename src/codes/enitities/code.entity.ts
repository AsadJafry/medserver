import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('codes')
export class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ default: false })
  isCodeUsed: boolean;
}
