import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { TagScope } from '&/entities/Tag/model/types/Tag';

export const setTagInit = (state: TagSchema, { payload }: PayloadAction<TagScope | null>) => {
    state.tagInit = payload;
};
