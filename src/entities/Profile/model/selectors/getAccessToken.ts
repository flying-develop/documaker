import { RootState } from '&/app/providers/Store/config/reducer';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '&/shared/config/constants';

export const getAccessToken = (state: RootState) =>
    state.profile.accessToken
        ? state.profile.accessToken
        : localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN) || '';
