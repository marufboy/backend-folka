import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ExceptionMessage } from '../common/exception.enum'
import { CreateBookDto, UpdateBookDto } from './dto'
import { ResponseUtil } from '../common/utils/response.util'

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

    return ResponseUtil.success(book, 'Book created successfully', HttpStatus.CREATED)
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
      throw new ForbiddenException(ExceptionMessage.BookNotFound)
    }

    const updatedBook = await this.prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        ...dto,
      },
    })

    return ResponseUtil.success(updatedBook, 'Book updated successfully', HttpStatus.OK)
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
      throw new ForbiddenException(ExceptionMessage.BookNotFound)
    }

    await this.prisma.book.delete({
      where: {
        id: bookId,
      },
    })

    return ResponseUtil.success(null, 'Book deleted successfully', HttpStatus.OK)
  }

  //Get detail book
  async getBookById(bookId: number) {
    const book = await this.prisma.book.findFirst({
      where: {
        id: bookId,
      },
    })

    if (!book) {
      throw new ForbiddenException(ExceptionMessage.BookNotFound)
    }

    return ResponseUtil.success(book, 'Book retrieved successfully', HttpStatus.OK)
  }

  async getAllBooks() {
    const books = await this.prisma.book.findMany()
    return ResponseUtil.success(books, 'Books retrieved successfully', HttpStatus.OK)
  }

  async getBoughtBooks(userId: number) {
    const books = await this.prisma.book.findMany({
      where: {
        payments: {
          some: {
            userId: userId,
          },
        },
      },
    })

    if (books.length === 0) {
      throw new ForbiddenException(ExceptionMessage.BookBoughtNotFound)
    }

    return ResponseUtil.success(
      books,
      'Bought books retrieved successfully',
      HttpStatus.OK,
    )
  }

  async getUnboughtBooks(userId: number) {
    const unboughtBooks = await this.prisma.book.findMany({
      where: {
        payments: {
          none: {
            userId: userId,
          },
        },
      },
    })

    if (unboughtBooks.length === 0) {
      throw new ForbiddenException(ExceptionMessage.BookUnBoughtNotFound)
    }

    return ResponseUtil.success(
      unboughtBooks,
      'Unbought books retrieved successfully',
      HttpStatus.OK,
    )
  }
}
