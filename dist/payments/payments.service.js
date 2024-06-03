"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exception_enum_1 = require("../common/exception.enum");
let PaymentsService = class PaymentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPayment(dto) {
        const book = await this.prisma.book.findUnique({ where: { id: dto.bookId } });
        if (!book) {
            throw new common_1.NotFoundException(exception_enum_1.ExceptionMessage.BookNotFound);
        }
        const existingPayment = await this.prisma.payment.findFirst({
            where: {
                userId: dto.userId,
                bookId: dto.bookId,
            },
        });
        if (existingPayment) {
            throw new common_1.BadRequestException(exception_enum_1.ExceptionMessage.AlreadyBoughtBook);
        }
        return this.prisma.payment.create({
            data: {
                ...dto,
            },
        });
    }
    async getPaymentsByUserId(userId) {
        return this.prisma.payment.findMany({
            where: { userId },
        });
    }
    async getTotalAmountByBookId(bookId) {
        const result = await this.prisma.payment.aggregate({
            _sum: {
                amount: true,
            },
            where: { bookId },
        });
        return result._sum.amount;
    }
    async deletePayment(paymentId) {
        const payment = await this.prisma.payment.findUnique({ where: { id: paymentId } });
        if (!payment) {
            throw new common_1.NotFoundException(exception_enum_1.ExceptionMessage.PaymentNotFound);
        }
        return this.prisma.payment.delete({
            where: { id: paymentId },
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map