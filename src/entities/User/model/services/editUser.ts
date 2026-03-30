import { Services, api, combineUrl, getUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const editUser = createAsyncThunk<any, User>('users/editUser', async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const url = getUrl({
            service: Services.USERS,
            endpoint: combineUrl({
                path: [user.id],
                params: { ...user } as Record<string, string | number | any>,
            }),
        });

        const { data } = await api.patch(url);

        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});
