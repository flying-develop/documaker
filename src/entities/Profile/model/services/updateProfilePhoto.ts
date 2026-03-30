import { api, combineUrl, getUrl, Services } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateProfilePhoto = createAsyncThunk<any, Record<string, string | number>>(
    'profile/updateProfilePhoto',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PROFILE,
                endpoint: combineUrl({
                    endpoint: 'update/photo',
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
