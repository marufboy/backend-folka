import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async getAllBooks() {
    return this.prisma.book.findMany();
  }

  async getBoughtBooks(userId: number) {
    const payments = await this.prisma.payment.findMany({
      where: { userId },
      include: { book: true },
    });
    return payments.map((payment) => payment.book);
  }

  async getUnboughtBooks(userId: number) {
    // Fetch IDs of books the user has already bought
    const boughtBooks = await this.prisma.payment.findMany({
      where: { userId },
      select: { bookId: true },
    });

    const boughtBookIds = boughtBooks.map((payment) => payment.bookId);

    // Fetch books that are not in the list of bought book IDs
    return this.prisma.book.findMany({
      where: {
        id: {
          notIn: boughtBookIds,
        },
      },
    });
  }
}
