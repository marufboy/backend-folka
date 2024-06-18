import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class  AuthDto{
    @ApiProperty({
        description: 'Email of the user',
        example: 'pengenganteng@gmail.com'
      })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'AppleID of the user (userID in apple account)',
        example: 'pengenganteng'
      })
    @IsString()
    @IsNotEmpty()
    appleID: string
}