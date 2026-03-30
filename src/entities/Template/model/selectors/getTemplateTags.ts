import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateTags = (state: RootState) => state.templates.templateTags;
