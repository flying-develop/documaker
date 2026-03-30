import { AuthSchema } from '../../types/AuthSchema';

export const setRejected = (state: AuthSchema, {payload}: any) => {
    state.error = payload?.response?.data?.message || payload?.response.data.error || null;
    state.errorCode = payload?.response?.status || null;
    state.loading = false;
};
