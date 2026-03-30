import { UsersSchema } from '../../types/UsersSchema';

export const resetTemplateFilters = (state: UsersSchema) => {
    state.filters = {};
};
