import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { Template } from '&/entities/Template/model/types/Template';
import { treeSearch } from '&/shared/utils';

export const fetchTemplateByIdFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ data: Template }>,
) => {
    const find = treeSearch('children');
    const editedSection = find(payload.data.sections || [], 'is_current', 1);
    if (editedSection) {
        state.editedSection = editedSection;
    }
    state.template = payload.data;
    state.loading = false;
};
