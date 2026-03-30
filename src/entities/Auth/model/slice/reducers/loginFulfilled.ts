import { AuthSchema } from '../../types/AuthSchema';

export const loginFulfilled = (state: AuthSchema, { payload }: any) => {
    state.loading = false;
    state.error = payload?.response?.data?.message || null;
    state.errorCode = payload?.response?.status || null;
    state.id = null;
};
