import { PayloadAction } from '@reduxjs/toolkit';
import { UsersSchema } from '../../types/UsersSchema';

export const setUserFilter = (
    state: UsersSchema,
    { payload }: PayloadAction<Record<string, string>>,
) => {
    state.filters = {
        ...state.filters,
        ...payload,
    };
};
