import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface Params {
    node: number | string;
}

export const fetchTemplateSections = createAsyncThunk<any, Params>(
    'templates/fetchTemplateSections',
    async ({ node }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.SECTIONS,
                    params: { node },
                }),
            });
            const { data } = await api.get(url);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
