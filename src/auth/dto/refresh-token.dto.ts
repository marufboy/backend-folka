import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refreshtoken to generate access-token',
    example: 'refresh-token',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}
