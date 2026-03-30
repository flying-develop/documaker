import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateKeyWords = (state: RootState) => state.templates.keyWords;
