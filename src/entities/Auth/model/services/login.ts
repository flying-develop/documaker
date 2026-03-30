// eslint-disable-next-line import/no-cycle
import { Endpoints, Services, api, combineUrl, getUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk<any, Record<string, string | number>>(
    'auth/login',
    async (params, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.AUTH,
                endpoint: combineUrl({
                    endpoint: Endpoints.LOGIN_PASSWORD,
                }),
            });

            const { data } = await api.post(url, params);

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
