// eslint-disable-next-line import/no-cycle
import { Endpoints, Services, api, combineUrl, getUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk<any, Record<string, string | number>>(
    'auth/register',
    async (params, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const url = getUrl({
                service: Services.AUTH,
                endpoint: combineUrl({
                    endpoint: Endpoints.REGISTER,
                }),
            });

            const { data } = await api.post(url, {
                name: params.name,
                phone: params.phone,
                email: params.email,
                password: params.password,
                password_confirmation: params.confirmPassword
            });

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
