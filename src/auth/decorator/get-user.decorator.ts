import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

export const 
GetUser = createParamDecorator((data, req): User => {
  const request = req.switchToHttp().getRequest();
  return request.user;
});
