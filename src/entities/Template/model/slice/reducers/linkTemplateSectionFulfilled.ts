import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';

export const linkTemplateSectionFulfilled = (state: TemplatesSchema) => {
    state.loading = false;
};
