import { PayloadAction } from '@reduxjs/toolkit';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const setTemplateSectionActiveFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<TemplateSection[]>,
) => {
    state.loading = false;
    state.template = {
        ...state.template,
        sections: payload,
    };
};
