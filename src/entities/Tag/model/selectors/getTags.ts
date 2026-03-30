import { RootState } from '&/app/providers/Store/config/reducer';

export const getTags = (state: RootState) => state.tags.tags;
