import { PayloadAction } from '@reduxjs/toolkit';
import { TemplateSectionType } from '&/entities/Template/model/types/TemplateSection';
import { getId } from '&/shared/utils';
import { INITIAL_EDITOR_STATE } from '&/shared/config/constants';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const addTemplateSection = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ type: TemplateSectionType; name: string }>,
) => {
    const sectionId = getId('temp_');
    const unitId = getId('temp_');
    const variantId = getId('temp_');

    const sections = state.template.sections || [];
    state.template.current_section = sectionId;
    state.template.sections = [
        ...sections,
        {
            id: sectionId,
            sort: 100,
            title: payload.name,
            level: 1,
            type: payload.type,
            section_data: {
                [variantId]: INITIAL_EDITOR_STATE,
            },
            children: [],
            units: [
                {
                    id: unitId,
                    title: '',
                    sort: 100,
                    current_variant: variantId,
                    current_state: INITIAL_EDITOR_STATE,
                    variants: [
                        {
                            id: variantId,
                        },
                    ],
                },
            ],
        },
    ];
};
