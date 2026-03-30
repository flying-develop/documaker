import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { Tag } from '&/entities/Tag/model/types/Tag';

export const deleteTag = (state: TagSchema) => {
    state.tag = {} as Tag;
};
