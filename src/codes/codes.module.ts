import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { Code } from './enitities/code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[UsersModule,
  TypeOrmModule.forFeature([Code]),],
  providers: [CodesService],
  controllers: [CodesController]
})
export class CodesModule {}
