// eslint-disable-next-line import/no-cycle
import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const changeUserManagers = createAsyncThunk<any, { id: number; managers: number[] }>(
    'user/changeUserManagers',
    async (params, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        const search = new URLSearchParams();
        params.managers.forEach(item => search.append('managers[]', item.toString()));

        try {
            const url = getUrl({
                service: Services.USERS,
                endpoint: combineUrl({
                    path: [params.id, Endpoints.SET_MANAGERS],
                }),
            });

            const { data } = await api.patch(url, search);

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
