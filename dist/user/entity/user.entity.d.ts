import { User } from '@prisma/client';
export declare class UserEntity implements User {
    id: number;
    email: string;
    name: string | null;
    hash: string | null;
}
