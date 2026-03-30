import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';

export const copyTemplateFulfilled = (state: TemplatesSchema) => {
    state.loading = false;
};
