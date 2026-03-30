import { PayloadAction } from '@reduxjs/toolkit';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const deleteTemplateFilter = (
    state: TemplatesSchema,
    { payload }: PayloadAction<string>,
) => {
    if (payload in state.filters) {
        delete state.filters[payload];
    }
};
