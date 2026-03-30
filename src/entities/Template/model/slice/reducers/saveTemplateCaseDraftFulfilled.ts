import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { Template } from '&/entities/Template/model/types/Template';
import { treeSearch } from '&/shared/utils';

export const saveTemplateCaseDraftFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<Template>,
) => {
    const find = treeSearch('children');
    const editedSection = find(payload.sections || [], 'is_current', 1);
    if (editedSection) {
        state.editedSection = editedSection;
    }
    state.loading = false;
    state.template = payload;
};
