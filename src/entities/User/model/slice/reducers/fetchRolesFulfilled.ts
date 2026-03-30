import { UsersSchema } from '../../types/UsersSchema';

export const fetchRolesFulfilled = (state: UsersSchema, { payload }: any) => {
    state.loading = false;
    state.error = null;

    state.roles = payload.data.map((role: any) => ({
        id: role.id,
        name: role.name,
        displayName: role.display_name,
    }));
};
