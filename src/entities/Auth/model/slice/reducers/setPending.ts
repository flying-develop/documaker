import { AuthSchema } from '../../types/AuthSchema';

export const setPending = (state: AuthSchema, { payload }: any) => {
    state.error = payload?.response?.data?.message || null;
    state.errorCode = payload?.response?.status || null;
    state.loading = true;
};
