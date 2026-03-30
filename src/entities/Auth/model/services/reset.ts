// eslint-disable-next-line import/no-cycle
import { Endpoints, Services, api, getUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const reset = createAsyncThunk<any, Record<string, string | number>>(
    'auth/reset',
    async (params, thinkAPI) => {
        const { rejectWithValue } = thinkAPI;

        try {
            const url = getUrl({
                service: Services.AUTH,
                endpoint: Endpoints.RESET,
            });


            const { data } = await api.post(url, {
                email: params.email,
                token: params.token,
                password: params.password,
                password_confirmation: params.confirmPassword
            });

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
