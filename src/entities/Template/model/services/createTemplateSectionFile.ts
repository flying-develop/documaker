import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Tag } from '&/entities/Tag/model/types/Tag';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { getId } from '&/shared/utils';
import { RootState } from '&/app/providers/Store/config/reducer';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';

export const createTemplateSectionFile = createAsyncThunk<any, { tag: Tag; unit?: TemplateUnit }>(
    'templates/createTemplateSectionFile',
    async ({ tag, unit }, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        const state = getState() as RootState;
        const {
            templates: { editedSection },
        } = state;

        try {
            const urlTag = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.TAGS,
                }),
            });

            const { data } = await api.post(urlTag, tag);
            const newTag = data.data;

            if (newTag.id) {
                const variantId = getId('temp_');
                const unitId = getId('temp_');
                const fileState = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"#${newTag.name}","type":"hashtag","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;
                const section_data = editedSection.section_data || {};
                const tags = editedSection.tags || [];
                const units = editedSection.units || [];

                const newUnit = {
                    id: unitId,
                    title: newTag.title,
                    current_variant: variantId,
                    current_state: fileState,
                    is_file: 1,
                    is_section: 1,
                    variants: [
                        {
                            id: variantId,
                        },
                    ],
                };

                let updatedUnits: TemplateUnit[] = [];
                if (unit?.id) {
                    const unitIndex = units.findIndex((u) => u.id === unit.id);
                    if (typeof unitIndex !== 'undefined') {
                        const leftSide = units.slice(0, unitIndex + 1);
                        const rightSide = units.slice(unitIndex + 1);
                        updatedUnits = [...leftSide, newUnit, ...rightSide];
                    } else {
                        updatedUnits.push(newUnit);
                    }
                } else {
                    updatedUnits = [newUnit, ...units];
                }

                const section = {
                    ...editedSection,
                    section_data: {
                        ...section_data,
                        [variantId]: fileState,
                    },
                    units: updatedUnits.map((unit, idx) => ({ ...unit, sort: (idx + 1) * 100 })),
                    tags: [...tags, newTag],
                };

                dispatch(updateTemplateSectionById({ section }));
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
