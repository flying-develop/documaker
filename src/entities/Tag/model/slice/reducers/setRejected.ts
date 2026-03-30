import { TagSchema } from '../../types/TagSchema';

export const setRejected = (state: TagSchema) => {
    state.loading = false;
};
