import { TemplatesSchema } from '../../types/TemplatesSchema';

export const resetTemplateAssignUsers = (state: TemplatesSchema) => {
    state.assignUsers = [];
};
