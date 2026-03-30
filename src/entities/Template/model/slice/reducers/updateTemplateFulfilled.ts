import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';

export const updateTemplateFulfilled = (state: TemplatesSchema) => {
    state.loading = false;
};
