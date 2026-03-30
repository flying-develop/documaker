import { RootState } from '&/app/providers/Store/config/reducer';

export const getUserFilters = (state: RootState) => state.users.filters;
