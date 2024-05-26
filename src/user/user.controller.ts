import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { User } from '@prisma/client'
import { UserEntity } from './entity/user.entity'

@UseGuards(JwtGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOkResponse({
    description: 'Get user object as response',
    type: UserEntity,
  })
  getUser(@GetUser() user: User) {
    return user
  }
}
