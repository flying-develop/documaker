import { PayloadAction } from '@reduxjs/toolkit';
import { treeSearch } from '&/shared/utils';
import { INITIAL_EDITOR_STATE } from '&/shared/config/constants';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const removeTemplateSectionUnitVariant = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ unitId: string | number; variantId: string | number }>,
) => {
    let section = state.editedSection;
    if (!section?.id) {
        const find = treeSearch('children');
        section = find(state.template.sections || [], 'is_current', 1);
    }
    const units = section.units || [];
    const section_data = section.section_data || {};
    state.editedSection = {
        ...section,
        is_edited: true,
        units: units.map((unit) => {
            if (unit.id === payload.unitId) {
                const unitVariants = unit.variants || [];
                if (unitVariants.length > 1) {
                    const variants =
                        unitVariants.filter((variant) => variant.id !== payload.variantId) || [];
                    const current_variant = variants[0].id;
                    const current_state = section_data[current_variant] || INITIAL_EDITOR_STATE;
                    return {
                        ...unit,
                        current_variant,
                        current_state,
                        variants,
                    };
                }
                return unit;
            }
            return unit;
        }),
    };
};
