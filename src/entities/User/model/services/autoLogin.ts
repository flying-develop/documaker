import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '&/shared/config/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const autoLogin = createAsyncThunk<any, Record<string, string | number>>(
    'user/autoLogin',
    async (credentials = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const url = getUrl({
                service: Services.AUTH,
                endpoint: combineUrl({
                    endpoint: Endpoints.LOGIN,
                }),
            });
            const { data } = await api.post(url, credentials);
            localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.access_token);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
