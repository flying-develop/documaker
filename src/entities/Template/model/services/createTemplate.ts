import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createTemplate = createAsyncThunk<any, string>(
    'templates/createTemplate',
    async (title, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        const formData = {
            title,
        };

        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.TEMPLATES,
                }),
            });
            const { data } = await api.post(url, formData);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
