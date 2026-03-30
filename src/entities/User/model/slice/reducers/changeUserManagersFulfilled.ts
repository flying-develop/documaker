import { UsersSchema } from '../../types/UsersSchema';

export const changeUserManagersFulfilled = (state: UsersSchema) => {
    state.loading = false;
    state.error = null;
};
