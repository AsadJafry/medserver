import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Code } from './enitities/code.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(Code)
    private codesRepository: Repository<Code>,
    private usersService: UsersService,
  ) {}

  async generateCode(): Promise<Code> {
    const newCode = this.codesRepository.create({ code: this.generateRandomCode() });
    return this.codesRepository.save(newCode);
  }

  generateRandomCode(): string {
    return Math.random().toString(36).substring(2, 8);  // Simple random string
  }

  async redeemCode(user:User , codeString: string): Promise<boolean> {
    const code = await this.codesRepository.findOne({ where: { code: codeString, isCodeUsed: false } });
    if (!code) return false;

    await this.codesRepository.update(code.id, { isCodeUsed: true });
    await this.usersService.grantGuideAccess(user);
    return true;
  }
}
