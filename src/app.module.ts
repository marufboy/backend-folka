import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/response.interceptor';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), BooksModule, PaymentsModule, PrismaModule, AuthModule, UserModule],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor
  }]
})
export class AppModule {}
