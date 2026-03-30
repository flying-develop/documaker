import { TagSchema } from '../../types/TagSchema';

export const setPending =  (state: TagSchema) => {
    state.loading = true;
};
