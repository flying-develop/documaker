import { Services, api, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addUser = createAsyncThunk<any, Record<string, string | number>>(
    'users/addUser',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = combineUrl({
                endpoint: Services.USERS,
                params,
            });

            const { data } = await api.post(url);

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
