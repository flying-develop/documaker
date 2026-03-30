// eslint-disable-next-line import/no-cycle
import { Endpoints, Services, api, getUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const forgot = createAsyncThunk<any, Record<string, string | number>>(
    'auth/forgot',
    async (params, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.AUTH,
                endpoint: Endpoints.FORGOT,
            });

            const { data } = await api.post(url, params);

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
