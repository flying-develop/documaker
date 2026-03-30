import { RootState } from '&/app/providers/Store/config/reducer';

export const getIdUser = (state: RootState) => state.auth.id;
