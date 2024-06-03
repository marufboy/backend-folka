import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    createPayment(dto: CreatePaymentDto): Promise<{
        id: number;
        userId: number;
        bookId: number;
        amount: number;
        date: Date;
    }>;
    getPaymentsByUserId(userId: number): Promise<{
        id: number;
        userId: number;
        bookId: number;
        amount: number;
        date: Date;
    }[]>;
    getTotalAmountByBookId(bookId: number): Promise<number>;
    deletePayment(paymentId: number): Promise<{
        id: number;
        userId: number;
        bookId: number;
        amount: number;
        date: Date;
    }>;
}
