import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTags = createAsyncThunk<any, string | number>(
    'tags/fetchTags',
    async (node, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.TAGS,
                    params: { node },
                }),
            });
            const { data } = await api.get(url);
            return data.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
