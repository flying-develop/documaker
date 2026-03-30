import { PayloadAction } from '@reduxjs/toolkit';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const setTemplateIsDraft = (state: TemplatesSchema, { payload }: PayloadAction<boolean>) => {
    state.isDraft = payload;
};
