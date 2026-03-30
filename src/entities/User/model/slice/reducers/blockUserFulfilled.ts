import { UsersSchema } from '../../types/UsersSchema';

export const blockUserFulfilled = (state: UsersSchema) => {
    state.loading = false;
    state.error = null;
};
