import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePaymentDto } from './dto'
import { ExceptionMessage } from '../common/exception.enum'

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: CreatePaymentDto) {
    const book = await this.prisma.book.findUnique({ where: { id: dto.bookId } });
    if (!book) {
      throw new NotFoundException(ExceptionMessage.BookNotFound);
    }

    const existingPayment = await this.prisma.payment.findFirst({
      where: {
        userId: dto.userId,
        bookId: dto.bookId,
      },
    });

    if (existingPayment) {
      throw new BadRequestException(ExceptionMessage.AlreadyBoughtBook);
    }

    return this.prisma.payment.create({
      data: {
        ...dto,
      },
    });
  }

  async getPaymentsByUserId(userId: number) {
    return this.prisma.payment.findMany({
      where: { userId },
    })
  }

  async getTotalAmountByBookId(bookId: number) {
    const result = await this.prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: { bookId },
    })
    return result._sum.amount
  }

  async deletePayment(paymentId: number) {
    const payment = await this.prisma.payment.findUnique({ where: { id: paymentId } })

    if (!payment) {
      throw new NotFoundException(ExceptionMessage.PaymentNotFound)
    }

    return this.prisma.payment.delete({
      where: { id: paymentId },
    })
  }
}
