import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto, UpdateBookDto } from './dto';
export declare class BooksService {
    private prisma;
    constructor(prisma: PrismaService);
    createBook(dto: CreateBookDto): Promise<{
        id: number;
        title: string;
        originStory: string;
        synopsis: string;
        imageUrl: string;
        downloadLink: string;
    }>;
    updateBook(bookId: number, dto: UpdateBookDto): Promise<{
        id: number;
        title: string;
        originStory: string;
        synopsis: string;
        imageUrl: string;
        downloadLink: string;
    }>;
    deleteBookById(bookId: number): Promise<void>;
    getBookById(bookId: number): import(".prisma/client").Prisma.Prisma__BookClient<{
        id: number;
        title: string;
        originStory: string;
        synopsis: string;
        imageUrl: string;
        downloadLink: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getAllBooks(): Promise<{
        id: number;
        title: string;
        originStory: string;
        synopsis: string;
        imageUrl: string;
        downloadLink: string;
    }[]>;
    getBoughtBooks(userId: number): Promise<{
        id: number;
        title: string;
        originStory: string;
        synopsis: string;
        imageUrl: string;
        downloadLink: string;
    }[]>;
    getUnboughtBooks(userId: number): Promise<{
        id: number;
        title: string;
        originStory: string;
        synopsis: string;
        imageUrl: string;
        downloadLink: string;
    }[]>;
}
