import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplates = (state: RootState) => state.templates.templates;
