import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { RootState } from '&/app/providers/Store/config/reducer';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { api, combineUrl, Endpoints, getUrl, Services } from '&/shared/api';

export const deleteTemplateSectionUnit = createAsyncThunk<any, TemplateUnit>(
    'templates/deleteTemplateSectionUnit',
    async (unit, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        const state = getState() as RootState;
        const {
            templates: { editedSection },
        } = state;

        try {
            const units = editedSection.units || [];
            const nextUnit = units?.find(
                (next) => next?.sort && unit?.sort && next.sort > unit.sort,
            );

            const updatedUnits = units
                .map((unit) => {
                    if (nextUnit && unit.id === nextUnit.id) {
                        return {
                            ...nextUnit,
                            sort: unit.sort,
                        };
                    }
                    return unit;
                })
                .filter(({ id }) => id !== unit.id);

            const section = {
                ...editedSection,
                units: updatedUnits,
                is_edited: true,
            };

            if (unit.is_file) {
                const tag = editedSection.tags?.find((tag) => tag.title === unit.title);
                if (tag) {
                    const url = getUrl({
                        service: Services.PETITIONS,
                        endpoint: combineUrl({
                            endpoint: Endpoints.TAGS,
                            path: [Number(tag.id)],
                        }),
                    });
                    await api.delete(url);
                }
            }
            dispatch(updateTemplateSectionById({ section }));
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
