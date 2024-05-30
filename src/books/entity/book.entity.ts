import { ApiProperty } from '@nestjs/swagger'
import { Book } from '@prisma/client'

export class BookEntity implements Book {
  originStory: string
  synopsis: string
  imageUrl: string
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({
    example: 'The Pengen Ganteng Story',
    required: true,
  })
  title: string

  @ApiProperty({
    example: 'Mas Pengen Ganteng',
    required: true,
  })
  author: string

  @ApiProperty({
    example: 50000,
    required: true,
  })
  price: number

  @ApiProperty({
    example: 'http://google.com',
    required: true,
  })
  downloadLink: string
}
