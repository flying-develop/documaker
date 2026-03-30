import { Endpoints, Services, api, combineUrl, getUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRoles = createAsyncThunk<any, Record<string, string | number>>(
    'users/roles',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.USERS,
                endpoint: combineUrl({
                    endpoint: Endpoints.ROLES,
                    params,
                }),
            });

            const { data } = await api.get(url);

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
