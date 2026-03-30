import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';

export const deleteTemplateCaseFulfilled = (state: TemplatesSchema) => {
    state.loading = false;
};
