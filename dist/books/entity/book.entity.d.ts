import { Book } from '@prisma/client';
export declare class BookEntity implements Book {
    originStory: string;
    synopsis: string;
    imageUrl: string;
    id: number;
    title: string;
    author: string;
    price: number;
    downloadLink: string;
}
