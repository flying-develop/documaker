import { TemplatesSchema } from '../../types/TemplatesSchema';

export const setPending = (state: TemplatesSchema) => {
    state.loading = true;
};
