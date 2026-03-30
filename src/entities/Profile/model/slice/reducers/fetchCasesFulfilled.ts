// import { Profile } from '../../types/Profile';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProfileSchema } from '../../types/ProfileSchema';

export const fetchCasesFulfilled = (
    state: ProfileSchema,
    {
        payload,
    }: PayloadAction<{
        data: Record<string, any>[];
        meta: Record<string, number>;
        current_page: number;
        per_page: number;
        total: number;
    }>,
) => {
    state.loading = false;

    state.pagination = {
        current: payload.current_page as number,
        pageSize: payload.per_page as number,
        total: payload.total as number,
    };

    state.cases = payload.data;
};
