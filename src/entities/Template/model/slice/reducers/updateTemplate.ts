import { PayloadAction } from '@reduxjs/toolkit';
import { Template } from '&/entities/Template/model/types/Template';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const updateTemplate = (state: TemplatesSchema, { payload }: PayloadAction<Template>) => {
    state.template = {
        ...state.template,
        ...payload,
    };
};
