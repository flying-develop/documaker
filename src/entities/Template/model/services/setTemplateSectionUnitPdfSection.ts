import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { RootState } from '&/app/providers/Store/config/reducer';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { api, combineUrl, Endpoints, getUrl, Services } from '&/shared/api';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { fetchTemplateSections } from '&/entities/Template/model/services/fetchTemplateSections';

export const setTemplateSectionUnitPdfSection = createAsyncThunk<
    any,
    { section: TemplateSection; unit: TemplateUnit }
>('templates/setTemplateSectionUnitPdfSection', async ({ unit, section }, thunkAPI) => {
    const { rejectWithValue, dispatch, getState } = thunkAPI;
    const state = getState() as RootState;
    const {
        templates: { editedSection },
    } = state;

    try {
        if (section?.id && unit.is_file) {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.UNITS,
                    path: [Number(unit.id), Endpoints.SET_PDF_SECTION],
                }),
            });
            await api.patch(url, { section: section.id });
        }
        if (editedSection?.id) {
            dispatch(updateTemplateSectionById({ section: editedSection }));
        } else if (section.petition_id) {
            dispatch(fetchTemplateSections({ node: section.petition_id }));
        }
    } catch (err) {
        return rejectWithValue(err);
    }
});
