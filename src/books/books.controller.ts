import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('bought/:userId')
  getBoughtBooks(@Param('userId') userId: number) {
    return this.booksService.getBoughtBooks(userId);
  }

  @Get('unbought/:userId')
  getUnboughtBooks(@Param('userId') userId: number) {
    return this.booksService.getUnboughtBooks(userId);
  }
}
