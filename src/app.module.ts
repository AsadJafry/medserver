import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodesModule } from './codes/codes.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '12345678',
      database: 'med',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Automatically syncs your schema (use only in dev)
    }),
    UsersModule, PaymentsModule, CodesModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
