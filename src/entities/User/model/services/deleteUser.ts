import { api, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteUser = createAsyncThunk<any, number>('user/deleteUser', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const url = getUrl({
            service: Services.USERS,
            endpoint: combineUrl({
                path: [id],
            }),
        });

        const { data } = await api.delete(url);

        return data;
    } catch (err) {
        return rejectWithValue(err);
    }
});
