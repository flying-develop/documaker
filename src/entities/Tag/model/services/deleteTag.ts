import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTemplateById } from '&/entities/Template/model/services/fetchTemplateById';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import { Tag } from '&/entities/Tag/model/types/Tag';
import { RootState } from '&/app/providers/Store/config/reducer';

export const deleteTag = createAsyncThunk<any, Tag>('tags/deleteTag', async (tag, thunkAPI) => {
    const { rejectWithValue, dispatch, getState } = thunkAPI;
    const state = getState() as RootState;
    const {
        templates: { editedSection },
    } = state;

    try {
        if (editedSection) {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.TAGS,
                    path: [Number(tag.id)],
                }),
            });

            await dispatch(tagsActions.setLoading(editedSection.id as number));
            const { data } = await api.delete(url);
            dispatch(templatesActions.resetTemplateEditedSection());
            dispatch(tagsActions.setLoading(null));
            dispatch(fetchTemplateById(editedSection.petition_id as number));
            return data;
        }
    } catch (err) {
        return rejectWithValue(err);
    }
});
