import { PayloadAction } from '@reduxjs/toolkit';
import { treeSearch } from '&/shared/utils';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const removeTemplateSectionUnit = (
    state: TemplatesSchema,
    { payload }: PayloadAction<TemplateUnit>,
) => {
    let section = state.editedSection;
    if (!section?.id) {
        const find = treeSearch('children');
        section = find(state.template.sections || [], 'is_current', 1);
    }

    const units = section.units || [];
    const section_data = section.section_data || {};
    payload.variants?.forEach((variant) => {
        if (variant.id in section_data) {
            delete section_data[variant.id];
        }
    });

    if (units.length > 1) {
        state.editedSection = {
            ...section,
            section_data,
            units: units.filter((unit) => unit.id !== payload.id),
            is_edited: true,
        };
    }
};
