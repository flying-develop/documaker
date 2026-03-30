import { RootState } from '&/app/providers/Store/config/reducer';

export const getLoading = (state: RootState) => state.users.loading;
