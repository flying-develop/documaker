import { Role } from './Role';

export interface Profile {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: {
        id: number;
        url: string;
    } | null;
    last_active_at: string;
    roles: Role[] | null;
}
