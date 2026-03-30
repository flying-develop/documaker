import { PayloadAction } from '@reduxjs/toolkit';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const setTemplateIsBlank = (state: TemplatesSchema, { payload }: PayloadAction<boolean>) => {
    state.isBlank = payload;
};
