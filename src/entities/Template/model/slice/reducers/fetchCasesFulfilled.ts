import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { Template } from '&/entities/Template/model/types/Template';
import { PaginationMeta } from '&/app/types/pagination-meta';

export const fetchCasesFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ data: Template[] } & PaginationMeta>,
) => {
    state.cases = payload.data;
    state.pagination = {
        current: payload.current_page as number,
        pageSize: payload.per_page as number,
        total: payload.total as number
    }
    state.loading = false;
};
