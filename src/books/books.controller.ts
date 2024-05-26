import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { BookEntity } from './entity/book.entity'
import { JwtGuard } from '../auth/guard'

@UseGuards(JwtGuard)
@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create book object as response',
    type: BookEntity,
  })
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto)
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Update book object as response',
    type: BookEntity,
  })
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.updateBook(id, updateBookDto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOkResponse({
    description: 'delete book by id',
  })
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.deleteBookById(id)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get book by id object as response',
    type: BookEntity,
  })
  getBook(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBookById(id)
  }

  @Get()
  @ApiOkResponse({
    description:
      'Get books object as response',
    type: BookEntity,
    isArray: true,
  })
  getAllBooks() {
    return this.booksService.getAllBooks()
  }


  @Get('bought/:userId')
  @ApiOkResponse({
    description:
      'Get books bought by user object as response',
    type: BookEntity,
    isArray: true,
  })
  getBoughtBooks(@Param('userId', ParseIntPipe) userId: number) {
    return this.booksService.getBoughtBooks(userId)
  }

  
  @Get('unbought/:userId')
  @ApiOkResponse({
    description:
      'Get books unbought by user object as response',
    type: BookEntity,
    isArray: true,
  })
  getUnboughtBooks(@Param('userId', ParseIntPipe) userId: number) {
    return this.booksService.getUnboughtBooks(userId)
  }
}
