import { INITIAL_EDITOR_STATE } from '&/shared/config/constants';
import { getId } from '&/shared/utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const addTemplateSectionUnit = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ sort: number; unit?: TemplateUnit }>,
) => {
    const unitId = getId('temp_');
    const variantId = getId('temp_');

    if (state.editedSection?.id) {
        const units = state.editedSection.units || [];
        const section_data = state.editedSection.section_data || {};
        state.editedSection = {
            ...state.editedSection,
            is_edited: false,
            section_data: {
                ...section_data,
                [variantId]: INITIAL_EDITOR_STATE,
            },
            units: [
                ...units,
                {
                    id: unitId,
                    current_variant: variantId,
                    current_state: INITIAL_EDITOR_STATE,
                    sort: payload.sort,
                    variants: [
                        {
                            id: variantId,
                        },
                    ],
                },
            ],
        };
    }
};
