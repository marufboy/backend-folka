import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { ForbiddenExceptionMessage } from '../common/exception.enum'

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  //TODO Create book
  async createBook(dto: CreateBookDto) {
    const book = await this.prisma.book.create({
      data: {
        ...dto,
      },
    })

    return book
  }
  //TODO Update Book
  async updateBook(bookId: number, dto: UpdateBookDto) {
    //search book by id
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    })

    if (!book) {
      throw new ForbiddenException(ForbiddenExceptionMessage.BookNotFound)
    }

    return this.prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        ...dto,
      },
    })
  }
  //TODO Delete book
  async deleteBookById(bookId: number) {
    //search book by id
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    })

    if (!book) {
      throw new ForbiddenException(ForbiddenExceptionMessage.BookNotFound)
    }

    await this.prisma.book.delete({
      where: {
          id: bookId,
      }
  })
  }

  //TODO Get detail book
  getBookById(bookId: number) {
    return this.prisma.book.findFirst({
      where: {
        id: bookId
      }
    })
  }

  async getAllBooks() {
    return this.prisma.book.findMany()
  }

  async getBoughtBooks(userId: number) {
    const payments = await this.prisma.payment.findMany({
      where: { userId },
      include: { book: true },
    })
    return payments.map((payment) => payment.book)
  }

  async getUnboughtBooks(userId: number) {
    // Fetch IDs of books the user has already bought
    const boughtBooks = await this.prisma.payment.findMany({
      where: { userId },
      select: { bookId: true },
    })

    const boughtBookIds = boughtBooks.map((payment) => payment.bookId)

    // Fetch books that are not in the list of bought book IDs
    return this.prisma.book.findMany({
      where: {
        id: {
          notIn: boughtBookIds,
        },
      },
    })
  }
}
