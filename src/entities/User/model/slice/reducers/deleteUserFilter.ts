import { PayloadAction } from '@reduxjs/toolkit';
import { UsersSchema } from '../../types/UsersSchema';

export const deleteUserFilter = (state: UsersSchema, { payload }: PayloadAction<string>) => {
    if (payload in state.filters) {
        delete state.filters[payload];
    }
};
