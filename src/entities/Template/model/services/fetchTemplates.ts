import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTemplates = createAsyncThunk<any, Record<string, string | number>>(
    'templates/fetchTemplates',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.TEMPLATES,
                    params,
                }),
            });
            const { data } = await api.get(url);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
