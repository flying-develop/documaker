import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { Template } from '&/entities/Template/model/types/Template';

export const setTemplateStatusFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<Template>,
) => {
    state.loading = false;
    if (payload.id) {
        state.templates = state.templates.map((template) => {
            if (template.id === payload.id) {
                return payload;
            }
            return template;
        });
    }
};
