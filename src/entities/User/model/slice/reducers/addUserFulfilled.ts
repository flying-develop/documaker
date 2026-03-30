import { UsersSchema } from '../../types/UsersSchema';

export const addUserFulfilled = (state: UsersSchema) => {
    state.error = null;
    state.loading = false;
};
