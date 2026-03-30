import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '&/app/providers/Store/config/reducer';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { fetchTemplateSections } from '&/entities/Template/model/services/fetchTemplateSections';

export const createTag = createAsyncThunk<any>('tags/createTag', async (_, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const state = getState() as RootState;
    const {
        tags: { tag },
        templates: { editedSection },
    } = state;
    try {
        const url = getUrl({
            service: Services.PETITIONS,
            endpoint: combineUrl({
                endpoint: Endpoints.TAGS,
            }),
        });

        await dispatch(updateTemplateSectionById({ section: editedSection }));
        const { data } = await api.post(url, tag);
        if (tag.node) {
            dispatch(fetchTemplateSections({ node: tag.node as number }));
        }
        return data;
    } catch (err) {
        return rejectWithValue(err);
    }
});
