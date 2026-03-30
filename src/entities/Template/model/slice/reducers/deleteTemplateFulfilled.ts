import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';

export const deleteTemplateFulfilled = (state: TemplatesSchema) => {
    state.loading = false;
};
