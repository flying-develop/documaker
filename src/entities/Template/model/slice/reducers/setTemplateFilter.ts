import { PayloadAction } from '@reduxjs/toolkit';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const setTemplateFilter = (
    state: TemplatesSchema,
    { payload }: PayloadAction<Record<string, string>>,
) => {
    state.filters = {
        ...state.filters,
        ...payload,
    };
};
