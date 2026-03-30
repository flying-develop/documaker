import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { getId } from '&/shared/utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '&/entities/Tag/model/types/Tag';

export const addTag = (state: TagSchema, { payload }: PayloadAction<Tag>) => {
    state.tag = {
        id: getId('temp_'),
        ...payload,
    };
};
