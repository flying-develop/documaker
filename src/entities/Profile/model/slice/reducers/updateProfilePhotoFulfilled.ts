import { ProfileSchema } from '../../types/ProfileSchema';

export const updateProfilePhotoFulfilled = (state: ProfileSchema) => {
    state.loading = false;
};
