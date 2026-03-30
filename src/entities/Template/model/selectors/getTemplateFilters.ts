import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplateFilters = (state: RootState) => state.templates.filters;
