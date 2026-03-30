import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteTemplate = createAsyncThunk<any, number>(
    'templates/deleteTemplate',
    async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.TEMPLATES,
                    path: [id]
                }),
            });

            const { data } = await api.delete(url);

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
