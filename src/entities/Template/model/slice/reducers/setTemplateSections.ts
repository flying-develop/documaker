import { PayloadAction } from '@reduxjs/toolkit';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const setTemplateSections = (
    state: TemplatesSchema,
    { payload }: PayloadAction<TemplateSection[]>,
) => {
    state.template = {
        ...state.template,
        sections: payload,
    };
    state.loading = false;
};
