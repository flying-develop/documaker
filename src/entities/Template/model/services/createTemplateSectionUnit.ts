import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { getId } from '&/shared/utils';
import { RootState } from '&/app/providers/Store/config/reducer';
import { INITIAL_EDITOR_STATE } from '&/shared/config/constants';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';

export const createTemplateSectionUnit = createAsyncThunk<any, { unit?: TemplateUnit }>(
    'templates/createTemplateSectionUnit',
    async ({ unit }, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        const state = getState() as RootState;
        const {
            templates: { editedSection },
        } = state;

        try {
            const variantId = getId('temp_');
            const unitId = getId('temp_');
            const units = editedSection.units || [];
            const section_data = editedSection.section_data || {};

            const newUnit = {
                id: unitId,
                current_variant: variantId,
                current_state: INITIAL_EDITOR_STATE,
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
                is_edited: false,
                section_data: {
                    ...section_data,
                    [variantId]: INITIAL_EDITOR_STATE,
                },
                units: updatedUnits.map((unit, idx) => ({ ...unit, sort: (idx + 1) * 100 })),
            };

            dispatch(updateTemplateSectionById({ section }));
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
