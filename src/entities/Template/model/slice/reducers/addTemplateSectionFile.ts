import { getId } from '&/shared/utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '&/entities/Tag/model/types/Tag';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const addTemplateSectionFile = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ tag: Tag }>,
) => {
    const variantId = getId('temp_');
    const unitId = getId('temp_');

    if (state.editedSection?.id) {
        const fileState = `"{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${payload.tag.title}","type":"hashtag","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}"`;
        const section_data = state.editedSection.section_data || {};
        const tags = state.editedSection.tags || [];
        const units = state.editedSection.units || [];
        const lastUnitSort = units[units.length - 1]?.sort || 400;
        state.editedSection = {
            ...state.editedSection,
            is_edited: false,
            section_data: {
                ...section_data,
                [variantId]: fileState,
            },
            units: [
                ...units,
                {
                    id: unitId,
                    title: payload.tag.name,
                    current_variant: variantId,
                    current_state: fileState,
                    sort: lastUnitSort + 100,
                    variants: [
                        {
                            id: variantId,
                        },
                    ],
                },
            ],
            tags: [...tags, payload.tag],
        };
    }
};
