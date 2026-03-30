import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '&/entities/Tag/model/types/Tag';

export const updateTag = (state: TagSchema, { payload }: PayloadAction<Tag>) => {
    state.tag = {
        ...state.tag,
        ...payload,
    };
};
