import { RootState } from '&/app/providers/Store/config/reducer';

export const getTagInit = (state: RootState) => state.tags.tagInit;
