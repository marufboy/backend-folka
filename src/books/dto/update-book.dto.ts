import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateBookDto {
  @ApiProperty({
    description: 'Title of the story book',
    example: 'The pengen ganteng',
    required: true,
  })
  @IsString()
  @IsOptional()
  title?: string

  @ApiProperty({
    description: 'Author of the story book',
    example: 'Mas pengen ganteng',
    required: true,
  })
  @IsString()
  @IsOptional()
  author?: string

  @ApiProperty({
    description: 'Price of the story book',
    example: 50000,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  price?: number

  @ApiProperty({
    description: 'Download link of the story book',
    example: 'http://google.com',
    required: true,
  })
  @IsString()
  @IsOptional()
  downloadLink?: string
}
