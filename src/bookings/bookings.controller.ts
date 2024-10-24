import { Controller, Post, Get, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // POST /bookings - Create a booking
  @Post()
  async createBooking(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phoneNumber') phoneNumber: string,
  ) {
    return this.bookingsService.createBooking(name, email, phoneNumber);
  }

  // GET /bookings - Get all bookings
  @Get()
  async getAllBookings() {
    return this.bookingsService.getAllBookings();
  }
}
