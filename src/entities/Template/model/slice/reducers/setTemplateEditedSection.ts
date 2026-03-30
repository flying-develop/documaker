import { PayloadAction } from '@reduxjs/toolkit';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const setTemplateEditedSection = (
    state: TemplatesSchema,
    { payload }: PayloadAction<TemplateSection>,
) => {
    state.editedSection = payload;
};
