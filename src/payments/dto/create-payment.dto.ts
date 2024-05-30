import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreatePaymentDto {
  @ApiProperty({
    description: 'User id from User model',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @ApiProperty({
    description: 'Book id from Book model',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  bookId: number

  @ApiProperty({
    description: 'Amount purchase book',
    example: 50000,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number
}
