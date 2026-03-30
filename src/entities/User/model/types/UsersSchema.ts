import { PaginationState } from '&/app/types/pagination-meta';
import { Role } from './Role';
import { User } from './User';

export interface UsersSchema {
    error: { code: number | undefined; message: string | null } | null;
    loading: boolean;
    users: User[];
    roles: Role[];
    pagination: PaginationState;
    filters: Record<string, string>;
}
