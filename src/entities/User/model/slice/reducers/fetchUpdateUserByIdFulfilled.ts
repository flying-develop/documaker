import { UsersSchema } from '../../types/UsersSchema';

export const fetchUpdateUserByIdFulfilled = (state: UsersSchema) => {
    state.loading = false;
    state.error = null;
};
