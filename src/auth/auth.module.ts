import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

import { User } from 'src/users/entities/user.entity';
import { JwtStrategy } from './jwt/jwt/jwt.strategy';

const jwtConfig = config.get('jwt');

@Module({
  imports: [ PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: '1y',
      },
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    // PassportModule,
    // JwtModule.register({
    //   secret: 'your_secret_key',  // Replace with env variable in production
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[JwtStrategy,PassportModule,AuthService]
})
export class AuthModule {}
