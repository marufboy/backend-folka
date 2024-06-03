import { Payment } from '@prisma/client';
export declare class PaymentEntity implements Payment {
    id: number;
    userId: number;
    bookId: number;
    amount: number;
    date: Date;
}
