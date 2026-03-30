import { TemplatesSchema } from '../../types/TemplatesSchema';

export const resetTemplateFilters = (state: TemplatesSchema) => {
    state.filters = {};
};
