import { UsersSchema } from '&/entities/User/model/types/UsersSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '&/entities/User/model/types/User';
import { PaginationMeta } from '&/app/types/pagination-meta';

export const fetchUsersFulfilled = (
    state: UsersSchema,
    { payload }: PayloadAction<{ data: User[] } & PaginationMeta>,
) => {
    const users: User[] = payload.data.map((item) => {
        const roles = item?.roles?.map(({ id, display_name, name }) => ({
            id,
            name,
            displayName: display_name,
        }));

        const managers = item.managers?.map((manager) => ({
            id: manager.id,
            name: manager.name,
            email: manager.email,
            phone: manager.phone,
            created_at: manager.created_at,
            updated_at: manager.updated_at,
            last_active_at: manager.last_active_at,
            roles,
            managers: [],
            avatar: manager.avatar
                ? {
                      id: manager.avatar.id,
                      url: manager.avatar?.url,
                  }
                : null,
        }));

        const newItem: User = {
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            created_at: item.created_at,
            updated_at: item.updated_at,
            last_active_at: item.last_active_at,
            roles,
            managers,
            avatar: item.avatar
                ? {
                      id: item.avatar.id,
                      url: item.avatar?.url,
                  }
                : null,
        };
        return newItem;
    });

    state.users = users;
    state.pagination = {
        current: payload.current_page as number,
        pageSize: payload.per_page as number,
        total: payload.total as number,
    };

    state.loading = false;
    state.error = null;
};
