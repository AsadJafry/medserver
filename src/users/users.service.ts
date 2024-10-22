import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Create a new user and store their hashed password
  async createUser(username: string, password: string): Promise<User> {
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    
    // Set default values for the new user
    newUser.isAdmin = false;
    newUser.isPremium = false;
    newUser.hasGuideAccess = false;
    newUser.hasBookedInterview = false;

    return this.usersRepository.save(newUser);
  }

  // Find user by username (typically used for login validation)
  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // Find user by their ID (used for various purposes, like JWT validation)
  async findOne(userId: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  // Grant guide access to a user
  async grantGuideAccess(user:User): Promise<User> {
    // const user = await this.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.hasGuideAccess = true;
    return this.usersRepository.save(user);
  }

  // Check if the user has guide access (isAdmin, isPremium, or hasGuideAccess)
  async checkGuideAccess(user:User): Promise<boolean> {
    // const user = await this.findOne(userId);
    // if (!user) {
    //   throw new Error('User not found');
    // }
    return user.isAdmin || user.isPremium || user.hasGuideAccess;
  }

  // Update user with guide access via code redemption
  async updateUserWithCode(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    user.hasGuideAccess = true;
    return this.usersRepository.save(user);
  }
}
