import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe:Stripe
  constructor() {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    console.log('Stripe Secret Key:', stripeSecretKey); // Add this line for debugging

    if (!stripeSecretKey) {
      throw new Error('Stripe secret key is not defined');
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20', // Replace with the correct API version
    });
  }
 async  createPaymentIntent(createPaymentDto: CreatePaymentDto) {
    try {
      
      const paymentIntent=await this.stripe.paymentIntents.create({
        amount:createPaymentDto.amount,
        currency:createPaymentDto.currency,
        automatic_payment_methods:{
          enabled:true
        }
      })
      return {paymentIntent:paymentIntent.client_secret}
    } catch (error) {
      return {error:error.message}
    }
    return `This action adds a new payment ${this.stripe}`;
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
