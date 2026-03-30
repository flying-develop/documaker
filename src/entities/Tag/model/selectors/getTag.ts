import { RootState } from '&/app/providers/Store/config/reducer';

export const getTag = (state: RootState) => state.tags.tag;
