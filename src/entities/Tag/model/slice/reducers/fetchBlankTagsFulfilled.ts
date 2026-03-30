import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '&/entities/Tag/model/types/Tag';

export const fetchBlankTagsFulfilled = (
    state: TagSchema,
    { payload }: PayloadAction<{ tags: Tag[] }>,
) => {
    state.tags = payload.tags;
    state.loading = false;
};
