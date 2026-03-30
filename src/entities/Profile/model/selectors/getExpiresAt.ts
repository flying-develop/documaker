import { RootState } from '&/app/providers/Store/config/reducer';
import { LOCAL_STORAGE_EXPIRES_AT } from '&/shared/config/constants';

export const getExpiresAt = (state: RootState) =>
    state.profile.expiresAt
        ? state.profile.expiresAt
        : Number(localStorage.getItem(LOCAL_STORAGE_EXPIRES_AT)) || 0;
