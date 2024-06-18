import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as argon from 'argon2'
import { AuthDto, RefreshTokenDto } from './dto'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ExceptionMessage } from '../common/exception.enum'
import { ResponseUtil } from '../common/utils/response.util'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.appleID)

    try {
      //save the new user to db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      })

      const token = await this.signToken(user.id, user.email)
      return ResponseUtil.success(token, "Signup succesful", HttpStatus.OK)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(ExceptionMessage.CredentialsTaken)
        }
      }

      throw error
    }
  }

  async signin(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    // if user does note exist throw exception
    if (!user)
      throw new ForbiddenException(ExceptionMessage.CredentialsIncorrect)
    //compare password
    const pwMatches = await argon.verify(user.hash, dto.appleID)
    //if password incorecct throw exception
    if (!pwMatches)
      throw new ForbiddenException(ExceptionMessage.CredentialsIncorrect)

    const token = await this.signToken(user.id, user.email)
    return ResponseUtil.success(token, "Signin succesful", HttpStatus.OK)
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string, refresh_token: string }> {
    const payload = {
      sub: userId,
      email,
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '1d',
        secret: this.config.get('JWT_SECRET'),
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: this.config.get('JWT_REFRESH_SECRET'),
      }),
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async refreshTokens(dto: RefreshTokenDto) {
    try {
      const payload = await this.jwt.verifyAsync(dto.refreshToken, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      })

      const tokens = await this.signToken(payload.sub, payload.email)
      return ResponseUtil.success(tokens, "Tokens refreshed successfully", HttpStatus.OK)
    } catch (error) {
      throw new ForbiddenException(ExceptionMessage.CredentialsIncorrect)
    }
  }
}
