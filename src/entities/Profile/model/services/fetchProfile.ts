// eslint-disable-next-line import/no-cycle
import { api, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk<any, Record<string, string | number>>(
    'profile/fetchProfile',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PROFILE,
                endpoint: combineUrl({
                    endpoint: '',
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
