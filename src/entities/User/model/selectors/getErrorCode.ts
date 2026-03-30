import { RootState } from '&/app/providers/Store/config/reducer';

export const getErrorCode = (state: RootState) => state.users.error;
