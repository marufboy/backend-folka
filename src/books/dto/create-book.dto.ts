import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBookDto {
  @ApiProperty({
    description: 'Title of the story book',
    example: 'The pengen ganteng',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: 'Author of the story book',
    example: 'Mas pengen ganteng',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  author: string

  @ApiProperty({
    description: 'Price of the story book',
    example: 50000,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number

  @ApiProperty({
    description: 'Download link of the story book',
    example: 'http://google.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  downloadLink: string
}
