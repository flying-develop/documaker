import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateCases = (state: RootState) => state.templates.cases;
