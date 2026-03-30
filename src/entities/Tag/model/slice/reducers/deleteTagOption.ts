import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { TagOption } from '&/entities/Tag/model/types/Tag';

export const deleteTagOption = (state: TagSchema, { payload }: PayloadAction<TagOption>) => {
    const options = state.tag.options || [];
    state.tag = {
        ...state.tag,
        options: options.filter((option) => option.id !== payload.id),
    };
};
