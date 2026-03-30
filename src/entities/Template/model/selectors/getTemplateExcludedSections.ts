import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateExcludedSections = (state: RootState) => state.templates.excludedSections;
