import { ProfileSchema } from '../../types/ProfileSchema';

export const setRejected = (state: ProfileSchema) => {
    state.loading = false;
    state.expiresAt = 0;
    state.accessToken = '';
};
