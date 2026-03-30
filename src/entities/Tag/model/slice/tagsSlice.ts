import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { addTag } from '&/entities/Tag/model/slice/reducers/addTag';
import { updateTag } from '&/entities/Tag/model/slice/reducers/updateTag';
import { addTagOption } from '&/entities/Tag/model/slice/reducers/addTagOption';
import { updateTagOption } from '&/entities/Tag/model/slice/reducers/updateTagOption';
import { deleteTagOption } from '&/entities/Tag/model/slice/reducers/deleteTagOption';
import { deleteTag } from '&/entities/Tag/model/slice/reducers/deleteTag';
import { createTag } from '&/entities/Tag/model/services/createTag';
import { createTagFulfilled } from '&/entities/Tag/model/slice/reducers/createTagFulfilled';
import { fetchTags } from '&/entities/Tag/model/services/fetchTags';
import { fetchTagsFulfilled } from '&/entities/Tag/model/slice/reducers/fetchTagsFulfilled';
import { setTagInit } from '&/entities/Tag/model/slice/reducers/setTagInit';
import { fetchTemplateBlank } from '&/entities/Template/model/services/fetchTemplateBlank';
import { fetchBlankTagsFulfilled } from '&/entities/Tag/model/slice/reducers/fetchBlankTagsFulfilled';
import { Tag } from '&/entities/Tag/model/types/Tag';
import { setLoading } from '&/entities/Tag/model/slice/reducers/setLoading';
import { setTag } from '&/entities/Tag/model/slice/reducers/setTag';
import { setRejected } from './reducers/setRejected';
import { setPending } from './reducers/setPending';
import { TagSchema } from '../types/TagSchema';

const initialState: TagSchema = {
    error: null,
    loading: false,
    loadingSection: null,
    tags: [],
    tag: {
        required: false,
        options: [],
    } as Tag,
    tagInit: null,
};
export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addTag,
        addTagOption,
        deleteTag,
        deleteTagOption,
        setTag,
        setTagInit,
        setLoading,
        updateTag,
        updateTagOption,
    },
    extraReducers: (builder: ActionReducerMapBuilder<TagSchema>) => {
        builder
            .addCase(createTag.pending, setPending)
            .addCase(createTag.rejected, setRejected)
            .addCase(createTag.fulfilled, createTagFulfilled)

            .addCase(fetchTags.pending, setPending)
            .addCase(fetchTags.rejected, setRejected)
            .addCase(fetchTags.fulfilled, fetchTagsFulfilled)

            .addCase(fetchTemplateBlank.pending, setPending)
            .addCase(fetchTemplateBlank.rejected, setRejected)
            .addCase(fetchTemplateBlank.fulfilled, fetchBlankTagsFulfilled);
    },
});

export const { actions: tagsActions } = tagsSlice;
export const { reducer: tagsReducer } = tagsSlice;
