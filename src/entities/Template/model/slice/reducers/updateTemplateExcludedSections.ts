import { PayloadAction } from '@reduxjs/toolkit';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const updateTemplateExcludedSections = (
    state: TemplatesSchema,
    { payload }: PayloadAction<number[]>,
) => {
    state.excludedSections = payload;
};
