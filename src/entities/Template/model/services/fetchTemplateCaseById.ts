import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTemplateCaseById = createAsyncThunk<any, string | number>(
    'templates/fetchTemplateCaseById',
    async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.CASES,
                    path: [id],
                }),
            });
            const { data } = await api.get(url);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
