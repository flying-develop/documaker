import { RootState } from '&/app/providers/Store/config/reducer';

export const getManagers = (state: RootState) => state.profile.managers;
