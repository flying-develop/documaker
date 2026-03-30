import { PayloadAction } from '@reduxjs/toolkit';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const updateTemplateSection = (
    state: TemplatesSchema,
    { payload }: PayloadAction<TemplateSection>,
) => {
    state.editedSection = {
        ...state.editedSection,
        ...payload,
    };
};
