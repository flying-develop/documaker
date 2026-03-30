// eslint-disable-next-line import/no-cycle
import { api, combineUrl, Endpoints, getUrl, Services } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const refreshAccessToken = createAsyncThunk<any, Record<string, string | number>>(
    'profile/refreshAccessToken',
    async (params = {}, thinkAPI) => {
        const { rejectWithValue } = thinkAPI;

        try {
            const url = getUrl({
                service: Services.PROFILE,
                endpoint: combineUrl({
                    endpoint: Endpoints.REFRESH,
                    params,
                }),
            });

            const { data } = await api.post(url);

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
