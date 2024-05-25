import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), BooksModule, PaymentsModule, PrismaModule],
})
export class AppModule {}
