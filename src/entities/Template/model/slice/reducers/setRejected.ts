import { TemplatesSchema } from '../../types/TemplatesSchema';

export const setRejected = (state: TemplatesSchema) => {
    state.loading = false;
};
