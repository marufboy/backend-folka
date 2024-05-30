import { ApiProperty } from '@nestjs/swagger'
import { Payment } from '@prisma/client'

export class PaymentEntity implements Payment {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 1 })
  userId: number

  @ApiProperty({ example: 1 })
  bookId: number

  @ApiProperty({
    example: 50000,
    required: true,
  })
  amount: number

  @ApiProperty({
    example: '2023-05-26T00:00:00.000Z',
    required: true,
  })
  date: Date
}
