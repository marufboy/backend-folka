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
    description: 'Origin story place of the story book',
    example: 'Tempat terganteng',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  originStory: string

  @ApiProperty({
    description: 'Synopsis of the story book',
    example: 'Mas pengen ganteng sedang ingin pergi ke tempat terganteng',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  synopsis: string

  @ApiProperty({
    description: 'Cover image of the story book',
    example: 'http://google.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string

  @ApiProperty({
    description: 'Download link of the story book',
    example: 'http://google.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  downloadLink: string
}
