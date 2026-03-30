import { RootState } from '&/app/providers/Store/config/reducer';

export const getProfile = (state: RootState) => state.profile.profile;
