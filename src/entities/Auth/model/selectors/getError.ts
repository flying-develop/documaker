import { RootState } from '&/app/providers/Store/config/reducer';

export const getError = (state: RootState) => state.auth.error;
