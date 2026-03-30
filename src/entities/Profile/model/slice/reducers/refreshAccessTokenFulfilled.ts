import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_EXPIRES_AT } from '&/shared/config/constants';
import { ProfileSchema } from '../../types/ProfileSchema';

export const refreshAccessTokenFulfilled = (state: ProfileSchema, { payload }: any) => {
    state.loading = false;

    const { access_token: accessToken, expires_in: expiresIn } = payload;


    if (Boolean(accessToken && expiresIn)) {
        state.accessToken = accessToken;
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, state.accessToken);

        state.expiresAt = Date.now() + (expiresIn * 1000);
        localStorage.setItem(LOCAL_STORAGE_EXPIRES_AT, state.expiresAt.toString());
    }
};
