import { UsersSchema } from '../../types/UsersSchema';

export const setPending = (state: UsersSchema) => {
    state.loading = true;
    state.error = null;
};
