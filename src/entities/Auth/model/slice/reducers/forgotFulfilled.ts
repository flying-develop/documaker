import { AuthSchema } from '../../types/AuthSchema';

export const forgotFulfilled = (state: AuthSchema) => {
    state.loading = false;
};
