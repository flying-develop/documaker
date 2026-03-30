// eslint-disable-next-line import/no-cycle
import { api, getUrl, Services, combineUrl, Endpoints } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchManagers = createAsyncThunk<any, Record<string, string | number>>(
    'profile/fetchManagers',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PROFILE,
                endpoint: combineUrl({
                    endpoint: Endpoints.MANAGERS,
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
