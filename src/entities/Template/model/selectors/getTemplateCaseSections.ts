import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateCaseSections = (state: RootState) => state.templates.templateCase.sections;
