import { PayloadAction } from '@reduxjs/toolkit';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { treeSearch } from '&/shared/utils';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const updateTemplateSectionUnit = (
    state: TemplatesSchema,
    { payload }: PayloadAction<TemplateUnit>,
) => {
    let section = state.editedSection;
    if (!section?.id) {
        const find = treeSearch('children');
        section = find(state.template.sections || [], 'is_current', 1);
    }
    const units = section.units || [];

    state.editedSection = {
        ...section,
        is_edited: true,
        units: units.map((unit) => {
            if (unit.id === payload.id) {
                return {
                    ...unit,
                    ...payload,
                };
            }
            return unit;
        }),
    };
};
