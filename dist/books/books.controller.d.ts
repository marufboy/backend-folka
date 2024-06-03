import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    createBook(createBookDto: CreateBookDto): Promise<{
        id: number;
        title: string;
        originStory: string;
        synopsis: string;
        imageUrl: string;
        downloadLink: string;
    }>;
    updateBook(id: number, updateBookDto: UpdateBookDto): Promise<{
        id: number;
        title: string;
        originStory: string;
        synopsis: string;
        imageUrl: string;
        downloadLink: string;
    }>;
    deleteBook(id: number): Promise<void>;
    getBook(id: number): import(".prisma/client").Prisma.Prisma__BookClient<{
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
