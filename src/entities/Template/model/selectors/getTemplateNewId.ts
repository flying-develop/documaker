import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateNewId = (state: RootState) => state.templates.newTemplateId;
