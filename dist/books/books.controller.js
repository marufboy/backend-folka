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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("./books.service");
const swagger_1 = require("@nestjs/swagger");
const book_entity_1 = require("./entity/book.entity");
const guard_1 = require("../auth/guard");
const dto_1 = require("./dto");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    createBook(createBookDto) {
        return this.booksService.createBook(createBookDto);
    }
    updateBook(id, updateBookDto) {
        return this.booksService.updateBook(id, updateBookDto);
    }
    deleteBook(id) {
        return this.booksService.deleteBookById(id);
    }
    getBook(id) {
        return this.booksService.getBookById(id);
    }
    getAllBooks() {
        return this.booksService.getAllBooks();
    }
    getBoughtBooks(userId) {
        return this.booksService.getBoughtBooks(userId);
    }
    getUnboughtBooks(userId) {
        return this.booksService.getUnboughtBooks(userId);
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Create book object as response',
        type: book_entity_1.BookEntity,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateBookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "createBook", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Update book object as response',
        type: book_entity_1.BookEntity,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateBookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "updateBook", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'delete book by id',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "deleteBook", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get book by id object as response',
        type: book_entity_1.BookEntity,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getBook", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get books object as response',
        type: book_entity_1.BookEntity,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)('bought/:userId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get books bought by user object as response',
        type: book_entity_1.BookEntity,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getBoughtBooks", null);
__decorate([
    (0, common_1.Get)('unbought/:userId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get books unbought by user object as response',
        type: book_entity_1.BookEntity,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getUnboughtBooks", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, swagger_1.ApiTags)('Books'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map