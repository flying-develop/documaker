import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { Tag } from '&/entities/Tag/model/types/Tag';

export const createTagFulfilled = (state: TagSchema) => {
    state.loading = false;
    state.tag = {} as Tag;
};
