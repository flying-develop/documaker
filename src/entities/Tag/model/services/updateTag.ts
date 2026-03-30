import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '&/app/providers/Store/config/reducer';
import {updateTemplateSectionById} from "&/entities/Template/model/services/updateTemplateSectionById";
import {fetchTemplateSections} from "&/entities/Template/model/services/fetchTemplateSections";

export const updateTag = createAsyncThunk<any>('tags/updateTag', async (_, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const state = getState() as RootState;
    const {
        tags: { tag },
        templates: { editedSection },
    } = state;
    try {
        if (tag.id) {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.TAGS,
                    path: [tag.id],
                }),
            });

            await dispatch(updateTemplateSectionById({ section: editedSection }));
            const { data } = await api.patch(url, tag);
            if (tag.node) {
                dispatch(fetchTemplateSections({ node: tag.node as number }));
            }
            return data;
        }
    } catch (err) {
        return rejectWithValue(err);
    }
});
