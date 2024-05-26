import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserEntity implements User {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'pengenganteng@gmail.com' })
  email: string

  @ApiProperty({
    example: 'pengen',
    required: false,
    nullable: true,
  })
  name: string | null

  @ApiHideProperty()
  hash: string | null
}
