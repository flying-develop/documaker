import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';
import { PayloadAction } from '@reduxjs/toolkit';

import { TemplateKeyWord } from '&/entities/Template/model/types/TemplateKeyWord';

export const fetchTemplateKeyWordsFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ data: TemplateKeyWord[] }>,
) => {
    state.keyWords = payload.data;
    state.loading = false;
};
