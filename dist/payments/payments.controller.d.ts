import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<{
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
