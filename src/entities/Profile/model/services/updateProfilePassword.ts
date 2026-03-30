import { api, combineUrl, getUrl, Services } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateProfilePassword = createAsyncThunk<any, Record<string, string | number>>(
    'profile/updateProfilePassword',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PROFILE,
                endpoint: combineUrl({
                    endpoint: 'update/password',
                    params,
                }),
            });

            const { data } = await api.patch(url);

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
