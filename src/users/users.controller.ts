import { Controller, Get, Param, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}
  
  @Get('check-guide-access')
  async checkguideaccess(@GetUser() user: User){
    return this.usersService.checkGuideAccess(user)
  }

  @Post('grant-guide-Access')
  async grantguideAccess(@GetUser() user: User){
    return this.usersService.grantGuideAccess(user)
  }



  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;  // Return user details from the token
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  // @Post('create')
  // async createUser(@Body() createUserDto: any) {
  //   return this.usersService.createUser(createUserDto);
  // }
  // @UseGuards(JwtAuthGuard)
  // @Post('grant-guide-access/:id')
  // async grantGuideAccess(@Param('id') userId: number) {
  //   return this.usersService.grantGuideAccess(userId);
  // }

  // @UseGuards(JwtAuthGuard)
  

  @Post('redeem-code')
  async redeemCode(@Body() body, @GetUser() user:User) {
    const {  code } = body;
    // Call the service to mark `hasGuideAccess` as true using email and code logic
    return this.usersService.updateUserWithCode(user.email);
  }

}
