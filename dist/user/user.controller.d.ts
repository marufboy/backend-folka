import { UserService } from './user.service';
import { User } from '@prisma/client';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(user: User): {
        id: number;
        email: string;
        name: string;
        hash: string;
    };
}
