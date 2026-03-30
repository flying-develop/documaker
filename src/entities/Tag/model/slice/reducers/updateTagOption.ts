import { PayloadAction } from '@reduxjs/toolkit';
import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { TagOption } from '&/entities/Tag/model/types/Tag';

export const updateTagOption = (state: TagSchema, { payload }: PayloadAction<TagOption>) => {
    const options = state.tag.options || [];
    state.tag = {
        ...state.tag,
        options: options.map((option) => {
            if (option.id === payload.id) {
                return {
                    ...option,
                    ...payload,
                };
            }
            return option;
        }),
    };
};
