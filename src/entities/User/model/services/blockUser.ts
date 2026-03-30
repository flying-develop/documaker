// eslint-disable-next-line import/no-cycle
import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const blockUser = createAsyncThunk<any, number>('user/blockUser', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const url = getUrl({
            service: Services.USERS,
            endpoint: combineUrl({
                path: [id, Endpoints.BLOCK],
            }),
        });

        const { data } = await api.patch(url);

        return data;
    } catch (err) {
        return rejectWithValue(err);
    }
});
