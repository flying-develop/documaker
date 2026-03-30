import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { RootState } from '&/app/providers/Store/config/reducer';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { api, combineUrl, Endpoints, getUrl, Services } from '&/shared/api';

export const updateTemplateSectionUnit = createAsyncThunk<any, TemplateUnit>(
    'templates/updateTemplateSectionUnit',
    async (unit, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        const state = getState() as RootState;
        const {
            templates: { editedSection },
            tags: { tag },
        } = state;

        try {
            const units = editedSection.units || [];

            const updatedUnits = units.map((u) => {
                if (u.id === unit.id) {
                    return {
                        ...u,
                        ...unit,
                    };
                }
                return u;
            });

            const section = {
                ...editedSection,
                units: updatedUnits,
                is_edited: true,
            };

            if (unit.is_file) {
                const url = getUrl({
                    service: Services.PETITIONS,
                    endpoint: combineUrl({
                        endpoint: Endpoints.TAGS,
                        path: [Number(tag.id)],
                    }),
                });
                await api.patch(url, tag);
            }
            dispatch(updateTemplateSectionById({ section }));
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
