// eslint-disable-next-line import/no-cycle
import { Services, api, combineUrl, getUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUpdateUserById = createAsyncThunk<any, Record<string, any>>(
    'users/fetchUpdateUserById',
    async (params = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.USERS,
                endpoint: combineUrl({
                    endpoint: `${params.id}/set-role`,
                    params
                }),
            });

            const { data } = await api.patch(url);

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
