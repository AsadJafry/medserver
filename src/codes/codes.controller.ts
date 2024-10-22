import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CodesService } from './codes.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

  @Post('generate')
  async generateCode() {
    return this.codesService.generateCode();
  }

  @Post('redeem')
  async redeemCode(
    @GetUser() user: User,
    @Body('code') code: string
  ) {
    const success = await this.codesService.redeemCode(user, code);
    if (!success) {
      return { success: false, message: 'Invalid or used code' };
    }
    return { success: true, message: 'Guide access granted' };
  }
}
