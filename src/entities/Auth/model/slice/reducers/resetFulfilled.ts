import { AuthSchema } from '../../types/AuthSchema';

export const resetFulfilled = (state: AuthSchema, { payload }: any) => {
    state.loading = false;

    if (payload && payload.access_token) {
        const { user } = payload;
        state.id = user.id;
    }
};
