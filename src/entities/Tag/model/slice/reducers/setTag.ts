import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '&/entities/Tag/model/types/Tag';

export const setTag = (state: TagSchema, { payload }: PayloadAction<Tag>) => {
    state.tag = payload;
};
