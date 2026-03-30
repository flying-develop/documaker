import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '&/entities/Tag/model/types/Tag';

export const fetchTagsFulfilled = (state: TagSchema, { payload }: PayloadAction<Tag[]>) => {
    state.tags = payload;
    state.loading = false;
};
