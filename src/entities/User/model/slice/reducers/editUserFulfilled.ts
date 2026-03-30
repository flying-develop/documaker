import { UsersSchema } from '../../types/UsersSchema';

export const editUserFulfilled = (state: UsersSchema) => {
    state.error = null;
    state.loading = false;
};
