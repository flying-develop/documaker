import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateLoading = (state: RootState) => state.templates.loading;
