import { RootState } from '&/app/providers/Store/config/reducer';

export const getTagLoading = (state: RootState) => state.tags.loading;
