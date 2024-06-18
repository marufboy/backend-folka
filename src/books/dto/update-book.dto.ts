import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateBookDto {
  @ApiProperty({
    description: 'Title of the story book',
    example: 'The pengen ganteng',
  })
  @IsString()
  @IsOptional()
  title?: string

  @ApiProperty({
    description: 'Origin story place of the story book',
    example: 'Tempat terganteng',
  })
  @IsString()
  @IsOptional()
  originStory?: string

  @ApiProperty({
    description: 'Synopsis of the story book',
    example: 'Mas pengen ganteng sedang ingin pergi ke tempat terganteng',
  })
  @IsString()
  @IsOptional()
  synopsis?: string

  @ApiProperty({
    description: 'Cover image of the story book',
    example: 'http://google.com',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string

  @ApiProperty({
    description: 'Download link of the story book',
    example: 'http://google.com',
  })
  @IsString()
  @IsOptional()
  downloadLink?: string
}
