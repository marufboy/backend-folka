import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, catchError, map, throwError } from 'rxjs'
import { ResponseUtil } from './utils/response.util'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((res) => ResponseUtil.success(res.data, res.message, res.statusCode)),
      catchError((err) => {
        const status =
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR

        return throwError(() =>
          ResponseUtil.error(err.message || 'Internal server error', status),
        )
      }),
    )
  }
}
