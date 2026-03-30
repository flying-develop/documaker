import { RootState } from '&/app/providers/Store/config/reducer';

export const getTagLoadingSection = (state: RootState) => state.tags.loadingSection;
