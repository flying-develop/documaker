import { AuthSchema } from '../../types/AuthSchema';

export const setLoginRejected = (state: AuthSchema, {payload}: any) => {
    state.error = payload?.response?.data?.message || payload?.response.data.error || null;
    state.errorCode = payload?.response?.status || null;
    state.id = null;
    state.loading = false;
};
