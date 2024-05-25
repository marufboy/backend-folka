import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('buy')
  createPayment(@Body() createPaymentDto: { userId: number; bookIds: number[] }) {
    return this.paymentsService.createPayment(createPaymentDto.userId, createPaymentDto.bookIds);
  }
}
