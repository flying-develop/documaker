import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface Params {
    node: number;
}

export const fetchTemplateBlank = createAsyncThunk<any, Params>(
    'templates/fetchTemplateBlank',
    async ({ node }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.TEMPLATES,
                    path: [node, Endpoints.TAGS],
                }),
            });
            const { data } = await api.get(url);
            return { ...data.data };
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
