import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';

export const patchTemplateSectionFulfilled = (state: TemplatesSchema) => {
    state.loading = false;
};
