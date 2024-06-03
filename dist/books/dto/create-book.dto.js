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
exports.CreateBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBookDto {
}
exports.CreateBookDto = CreateBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the story book',
        example: 'The pengen ganteng',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Origin story place of the story book',
        example: 'Tempat terganteng',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "originStory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Synopsis of the story book',
        example: 'Mas pengen ganteng sedang ingin pergi ke tempat terganteng',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "synopsis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cover image of the story book',
        example: 'http://google.com',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Download link of the story book',
        example: 'http://google.com',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "downloadLink", void 0);
//# sourceMappingURL=create-book.dto.js.map