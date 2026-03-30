import { PaginationState } from '&/app/types/pagination-meta';
import { Template } from '&/entities/Template/model/types/Template';
import { User } from '&/entities/User/model/types/User';
import { Profile } from './Profile';

export interface ProfileSchema {
    loading: boolean;
    error: any;
    profile: Profile | null;
    accessToken: string;
    expiresAt: number;
    cases: Template[];
    pagination: PaginationState;
    managers: User[];
}
