import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { Template } from '&/entities/Template/model/types/Template';
import { treeSearch } from '&/shared/utils';

export const fetchTemplateCaseByIdFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ data: Template }>,
) => {
    if (payload?.data?.sections) {
        const templateCase = payload.data;
        const find = treeSearch('children');
        const currentSection = find(templateCase?.sections || [], 'is_current', 1);
        state.editedSection = currentSection;
        if (!!currentSection?.tags?.length || templateCase?.is_draft) {
            state.template = payload.data;
        } else {
            const globalSection = find(templateCase?.sections || [], 'is_global', 1);
            currentSection.is_current = 0;
            if (globalSection) {
                state.template = {
                    ...templateCase,
                    sections: templateCase.sections?.map((section) =>
                        !!section.is_global
                            ? {
                                  ...section,
                                  is_current: 1,
                              }
                            : section,
                    ),
                };
            }
        }
    }

    state.loading = false;
};
