import { RootState } from '&/app/providers/Store/config/reducer';

export const getCases = (state: RootState) => state.profile.cases;
