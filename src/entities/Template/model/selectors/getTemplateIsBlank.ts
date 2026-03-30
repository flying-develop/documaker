import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateIsBlank = (state: RootState) => state.templates.isBlank;
