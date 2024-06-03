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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exception_enum_1 = require("../common/exception.enum");
let BooksService = class BooksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBook(dto) {
        const book = await this.prisma.book.create({
            data: {
                ...dto,
            },
        });
        return book;
    }
    async updateBook(bookId, dto) {
        const book = await this.prisma.book.findUnique({
            where: {
                id: bookId,
            },
        });
        if (!book) {
            throw new common_1.ForbiddenException(exception_enum_1.ExceptionMessage.BookNotFound);
        }
        return this.prisma.book.update({
            where: {
                id: bookId,
            },
            data: {
                ...dto,
            },
        });
    }
    async deleteBookById(bookId) {
        const book = await this.prisma.book.findUnique({
            where: {
                id: bookId,
            },
        });
        if (!book) {
            throw new common_1.ForbiddenException(exception_enum_1.ExceptionMessage.BookNotFound);
        }
        await this.prisma.book.delete({
            where: {
                id: bookId,
            }
        });
    }
    getBookById(bookId) {
        return this.prisma.book.findFirst({
            where: {
                id: bookId
            }
        });
    }
    async getAllBooks() {
        return this.prisma.book.findMany();
    }
    async getBoughtBooks(userId) {
        const payments = await this.prisma.payment.findMany({
            where: { userId },
            include: { book: true },
        });
        return payments.map((payment) => payment.book);
    }
    async getUnboughtBooks(userId) {
        const boughtBooks = await this.prisma.payment.findMany({
            where: { userId },
            select: { bookId: true },
        });
        const boughtBookIds = boughtBooks.map((payment) => payment.bookId);
        return this.prisma.book.findMany({
            where: {
                id: {
                    notIn: boughtBookIds,
                },
            },
        });
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksService);
//# sourceMappingURL=books.service.js.map