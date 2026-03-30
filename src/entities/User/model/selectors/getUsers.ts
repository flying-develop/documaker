import { RootState } from '&/app/providers/Store/config/reducer';

export const getUsers = (state: RootState) => state.users.users;
