import { ProfileSchema } from '../../types/ProfileSchema';

export const updateProfileInfoFulfilled = (state: ProfileSchema) => {
    state.loading = false;
};
