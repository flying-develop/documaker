import { isAxiosError } from 'axios';
import { UsersSchema } from '../../types/UsersSchema';

export const setRejected = (state: UsersSchema, { payload }: any) => {
    if (isAxiosError(payload)) {
        state.error = {
            message: payload.response?.data.message,
            code: payload.response?.status,
        };
    }

    state.loading = false;
};
