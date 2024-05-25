import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(userId: number, bookIds: number[]) {
    const payments = [];
    for (const bookId of bookIds) {
      const book = await this.prisma.book.findUnique({ where: { id: bookId } });
      if (book) {
        payments.push({
          userId,
          bookId,
          amount: book.price,
        });
      }
    }
    return this.prisma.payment.createMany({ data: payments });
  }
}
