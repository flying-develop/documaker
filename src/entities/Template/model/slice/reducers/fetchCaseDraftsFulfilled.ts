import { PayloadAction } from '@reduxjs/toolkit';
import { TemplatesSchema } from '../../types/TemplatesSchema';
import { Template } from '../../types/Template';

export const fetchCaseDraftsFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ data: { data: Template[] }; parent: Template }>,
) => {
    const { data, parent } = payload;

    if (parent.id) {
        const indexParentCase = state.cases.findIndex(({ id }) => id === parent.id);

        if (state.cases[indexParentCase]) {
            state.cases[indexParentCase].drafts = data.data;
        }
    }

    state.loading = false;
};
