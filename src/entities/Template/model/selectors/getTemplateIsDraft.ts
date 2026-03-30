import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateIsDraft = (state: RootState) => state.templates.isDraft;
