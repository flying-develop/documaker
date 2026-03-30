import { ProfileSchema } from '../../types/ProfileSchema';

export const setPending = (state: ProfileSchema) => {
    state.loading = true;
};
