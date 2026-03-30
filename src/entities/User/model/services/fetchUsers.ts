// eslint-disable-next-line import/no-cycle
import { api, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk<any, Record<string, string | number>>(
    'user/fetchUsers',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = combineUrl({
                endpoint: Services.USERS,
                params,
            });

            const { data } = await api.get(url);

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
