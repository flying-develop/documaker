// eslint-disable-next-line import/no-cycle
import { api, combineUrl, Endpoints, getUrl, Services } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateProfileInfo = createAsyncThunk<any, Record<string, string | number>>(
    'profile/updateProfileInfo',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PROFILE,
                endpoint: combineUrl({
                    endpoint: Endpoints.PROFILE_UPDATE,
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
