// eslint-disable-next-line import/no-cycle
import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const checkLogin = createAsyncThunk<any, Record<string, string | number>>(
    'auth/checkUser',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.AUTH,
                endpoint: combineUrl({
                    endpoint: Endpoints.LOGIN
                }),
            });

            const { data } = await api.post(url, params);

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
