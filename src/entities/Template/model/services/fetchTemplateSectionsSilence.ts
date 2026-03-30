import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';

interface Params {
    node: number | string;
}

export const fetchTemplateSectionsSilence = createAsyncThunk<any, Params>(
    'templates/fetchTemplateSectionsSilence',
    async ({ node }, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.SECTIONS,
                    params: { node },
                }),
            });
            const { data } = await api.get(url);
            if (data.data) {
                dispatch(templatesActions.setTemplateSections(data.data));
            }
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
