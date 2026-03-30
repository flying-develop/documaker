import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateSections = (state: RootState) => state.templates.template.sections;
