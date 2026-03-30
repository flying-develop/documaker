import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateSectionFilters = (state: RootState) => state.templates.sectionFilters;
