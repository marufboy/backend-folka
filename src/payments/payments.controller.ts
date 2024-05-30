import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { CreatePaymentDto } from './dto'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PaymentEntity } from './entity/payment.entity'
import { JwtGuard } from '../auth/guard'

@UseGuards(JwtGuard)
@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('buy')
  @ApiCreatedResponse({
    description: 'Create book object as response',
    type: PaymentEntity,
  })
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto)
  }

  @Get('user/:userId')
  @ApiOkResponse({
    description: 'Get book by id object as response',
    type: PaymentEntity,
    isArray: true
  })
  getPaymentsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.paymentsService.getPaymentsByUserId(userId)
  }

  @ApiOkResponse({
    description: 'Total amount paid for the book',
    type: Number,
  })
  @Get('total/book/:bookId')
  getTotalAmountByBookId(@Param('bookId', ParseIntPipe) bookId: number) {
    return this.paymentsService.getTotalAmountByBookId(bookId)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':paymentId')
  @ApiOkResponse({
    description: 'Payment has been successfully deleted',
    type: PaymentEntity,
  })
  deletePayment(@Param('paymentId', ParseIntPipe) paymentId: number) {
    return this.paymentsService.deletePayment(paymentId)
  }
}
