import { HttpStatus } from '@nestjs/common'

export class ResponseUtil {
  static success(
    data: any,
    message: string = 'Success',
    statusCode: number = HttpStatus.OK,
  ) {
    return {
      statusCode: statusCode,
      message: message,
      data: data !== undefined ? data : [],
    }
  }

  static error(message: string, statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR) {
    return {
      statusCode: statusCode,
      message: message,
      data: [],
    }
  }
}
