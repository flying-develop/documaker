import { ProfileSchema } from '../../types/ProfileSchema';

export const updateProfilePasswordFulfilled = (state: ProfileSchema) => {
    state.loading = false;
};
