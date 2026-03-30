import { RootState } from '&/app/providers/Store/config/reducer';

export const getRoles = (state: RootState) => state.users.roles;
