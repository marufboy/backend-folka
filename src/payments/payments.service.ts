import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePaymentDto } from './dto'
import { ExceptionMessage } from '../common/exception.enum'
import { ResponseUtil } from '../common/utils/response.util'

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: CreatePaymentDto) {
    const book = await this.prisma.book.findUnique({ where: { id: dto.bookId } })
    if (!book) {
      throw new NotFoundException(ExceptionMessage.BookNotFound)
    }

    const existingPayment = await this.prisma.payment.findFirst({
      where: {
        userId: dto.userId,
        bookId: dto.bookId,
      },
    })

    if (existingPayment) {
      throw new BadRequestException(ExceptionMessage.AlreadyBoughtBook)
    }

    const payment = await this.prisma.payment.create({
      data: {
        ...dto,
      },
    })

    return ResponseUtil.success(
      payment,
      'Payment created successfully',
      HttpStatus.CREATED,
    )
  }

  async getPaymentsByUserId(userId: number) {
    const payments = await this.prisma.payment.findMany({
      where: { userId },
    })

    if (payments.length === 0) {
      throw new NotFoundException(ExceptionMessage.PaymentNotFound)
    }

    return ResponseUtil.success(
      payments,
      'Payments retrieved successfully',
      HttpStatus.OK,
    )
  }

  async getTotalAmountByBookId(bookId: number) {
    const result = await this.prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: { bookId },
    })

    return ResponseUtil.success(
      {"totalAmount":result._sum.amount},
      'Total amount retrieved successfully',
      HttpStatus.OK,
    )
  }

  async deletePayment(paymentId: number) {
    const payment = await this.prisma.payment.findUnique({ where: { id: paymentId } })

    if (!payment) {
      throw new NotFoundException(ExceptionMessage.PaymentNotFound)
    }

    await this.prisma.payment.delete({
      where: { id: paymentId },
    });

    return ResponseUtil.success(null, 'Payment deleted successfully', HttpStatus.OK)
  }
}
