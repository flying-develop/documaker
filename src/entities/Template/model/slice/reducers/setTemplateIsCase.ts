import { PayloadAction } from '@reduxjs/toolkit';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const setTemplateIsCase = (state: TemplatesSchema, { payload }: PayloadAction<boolean>) => {
    state.isCase = payload;
};
