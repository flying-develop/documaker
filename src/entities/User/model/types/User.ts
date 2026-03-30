export interface User {
    name: string;
    email: string;
    id: number;
    phone: string;
    created_at?: string;
    updated_at: string;
    last_active_at: string;
    roles?: any[];
    managers?: User[] | [];
    avatar: {
        id: number;
        url: string;
    } | null;
}
