import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { AddressInfo } from 'net';
dotenv.config()
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY); // Debug log

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 // await app.listen(3000);
  const server = await app.listen(3000);

  const addressInfo: AddressInfo = server.address() as AddressInfo;
  
  // Print the IP address and port
  console.log(`App is running on: http://${addressInfo.address}:${addressInfo.port}`);

}

bootstrap();
