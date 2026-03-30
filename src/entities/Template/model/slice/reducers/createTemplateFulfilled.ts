import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';
import { PayloadAction } from '@reduxjs/toolkit';

export const createTemplateFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ data: { id: number } }>,
) => {
    state.newTemplateId = payload.data.id;
    state.loading = false;
};
