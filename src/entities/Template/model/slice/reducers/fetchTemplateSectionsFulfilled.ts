import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { treeSearch } from '&/shared/utils';

export const fetchTemplateSectionsFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ data: TemplateSection[] }>,
) => {
    const find = treeSearch('children');
    const editedSection = find(payload.data || [], 'is_current', 1);

    state.template = {
        ...state.template,
        sections: payload.data || [],
    };

    if (editedSection) {
        state.editedSection = editedSection;
    }

    state.loading = false;
};
