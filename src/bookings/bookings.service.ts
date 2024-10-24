import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingsRepository: Repository<Booking>,
    // private readonly sendMailService: SendMailService,  // Inject your mail service
  ) {}

  // Create a new booking
  async createBooking(name: string, email: string, phoneNumber: string): Promise<Booking> {
    const newBooking = this.bookingsRepository.create({ name, email, phoneNumber });
    const savedBooking = await this.bookingsRepository.save(newBooking);

    // Send email notification
    // await this.sendMailService.sendMail({
    //   to: 'admin@example.com',  // Set the admin's email here
    //   subject: 'New Booking Request',
    //   text: `Booking details: \n Name: ${name}, Email: ${email}, Phone: ${phoneNumber}`,
    // });

    return savedBooking;
  }

  // Fetch all bookings
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingsRepository.find();
  }
}
