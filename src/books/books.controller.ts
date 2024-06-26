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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { BookEntity } from './entity/book.entity'
import { JwtGuard } from '../auth/guard'
import { CreateBookDto, UpdateBookDto } from './dto'
import { Public } from '../auth/decorator'

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

  @Public()
  @Get(':id')
  @ApiOkResponse({
    description: 'Get book by id object as response',
    type: BookEntity,
  })
  getBook(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBookById(id)
  }

  @Public()
  @Get()
  @ApiOkResponse({
    description: 'Get books object as response',
    type: BookEntity,
    isArray: true,
  })
  getAllBooks() {
    return this.booksService.getAllBooks()
  }

  @Get('bought/:userId')
  @ApiOkResponse({
    description: 'Get books bought by user object as response',
    type: BookEntity,
    isArray: true,
  })
  getBoughtBooks(@Param('userId', ParseIntPipe) userId: number) {
    return this.booksService.getBoughtBooks(userId)
  }

  @Get('unbought/:userId')
  @ApiOkResponse({
    description: 'Get books unbought by user object as response',
    type: BookEntity,
    isArray: true,
  })
  getUnboughtBooks(@Param('userId', ParseIntPipe) userId: number) {
    return this.booksService.getUnboughtBooks(userId)
  }
}
