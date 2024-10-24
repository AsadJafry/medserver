import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodesModule } from './codes/codes.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { typeOrmConfig } from './config/typeorm-config';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule, PaymentsModule, CodesModule,AuthModule, BookingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
