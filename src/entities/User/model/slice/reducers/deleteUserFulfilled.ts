import { UsersSchema } from '../../types/UsersSchema';

export const deleteUserFulfilled = (state: UsersSchema) => {
    state.loading = false;
    state.error = null;
};
