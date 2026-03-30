import { PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_EDITOR_STATE } from '&/shared/config/constants';
import { getId, treeSearch } from '&/shared/utils';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const addTemplateSectionUnitVariant = (
    state: TemplatesSchema,
    { payload }: PayloadAction<TemplateUnit>,
) => {
    const variantId = getId('temp_');

    let section = state.editedSection;
    if (!section?.id) {
        const find = treeSearch('children');
        section = find(state.template.sections || [], 'is_current', 1);
    }
    const units = section.units || [];
    const section_data = section.section_data || {};

    state.editedSection = {
        ...state.editedSection,
        is_edited: true,
        section_data: {
            ...section_data,
            [variantId]: INITIAL_EDITOR_STATE,
        },
        units: units.map((unit) => {
            if (unit.id === payload.id) {
                const variants = unit.variants || [];
                return {
                    ...unit,
                    current_variant: variantId,
                    current_state: INITIAL_EDITOR_STATE,
                    variants: [
                        ...variants,
                        {
                            id: variantId,
                        },
                    ],
                };
            }
            return unit;
        }),
    };
};
