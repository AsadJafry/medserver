import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  username:string;
  
  @Column({ unique: true,nullable:true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isPremium: boolean;

  @Column({ default: false })
  hasGuideAccess: boolean;

  @Column({ default: false })
  hasBookedInterview: boolean;
}
