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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const payment_entity_1 = require("./entity/payment.entity");
const guard_1 = require("../auth/guard");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    createPayment(createPaymentDto) {
        return this.paymentsService.createPayment(createPaymentDto);
    }
    getPaymentsByUserId(userId) {
        return this.paymentsService.getPaymentsByUserId(userId);
    }
    getTotalAmountByBookId(bookId) {
        return this.paymentsService.getTotalAmountByBookId(bookId);
    }
    deletePayment(paymentId) {
        return this.paymentsService.deletePayment(paymentId);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('buy'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Create book object as response',
        type: payment_entity_1.PaymentEntity,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get book by id object as response',
        type: payment_entity_1.PaymentEntity,
        isArray: true
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getPaymentsByUserId", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Total amount paid for the book',
        type: Number,
    }),
    (0, common_1.Get)('total/book/:bookId'),
    __param(0, (0, common_1.Param)('bookId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getTotalAmountByBookId", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':paymentId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Payment has been successfully deleted',
        type: payment_entity_1.PaymentEntity,
    }),
    __param(0, (0, common_1.Param)('paymentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "deletePayment", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, swagger_1.ApiTags)('Payments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map