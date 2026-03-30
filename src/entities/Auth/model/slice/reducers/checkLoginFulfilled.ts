import { AuthSchema } from '../../types/AuthSchema';

export const checkLoginFulfilled = (state: AuthSchema, { payload }: any) => {
    state.loading = false;
    state.error = payload?.response?.data?.message || null;
    state.errorCode = payload?.response?.status || null;

    if (payload && payload.user) {
        state.id = payload.user;
    }
};
