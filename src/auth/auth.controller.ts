import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto, RefreshTokenDto } from './dto'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Throttle} from '@nestjs/throttler';
import { UserEntity } from '../user/entity/user.entity'

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description:
      'Created user object as response',
    type: UserEntity,
  })
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto)
  }

  @Throttle({ short: { limit: 2, ttl: 1000 }, long: { limit: 5, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOkResponse({
    description: 'Signin successful',
    schema: {
      example: {
        access_token: 'access-token',
        refresh_token: 'refresh-token',
      },
    },
  })
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOkResponse({
    description: 'Tokens refreshed successfully',
    schema: {
      example: {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
      },
    },
  })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto)
  }
}
