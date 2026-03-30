import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { RootState } from '&/app/providers/Store/config/reducer';
import { updateTemplateSectionByIdSilence } from '&/entities/Template/model/services/updateTemplateSectionByIdSilence';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';

export const duplicateTemplateSection = createAsyncThunk<any, { section: TemplateSection }>(
    'templates/duplicateTemplateSection',
    async ({ section }, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;

        try {
            const state = getState() as RootState;
            const {
                templates: { editedSection },
            } = state;

            if (section?.id) {
                const url = getUrl({
                    service: Services.PETITIONS,
                    endpoint: combineUrl({
                        endpoint: Endpoints.SECTIONS,
                        path: [section.id, Endpoints.DUPLICATE],
                    }),
                });

                // сохраняем текцущую секцию
                await dispatch(updateTemplateSectionByIdSilence({ section: editedSection }));

                const { data } = await api.post(url);
                if (data?.data?.section) {
                    dispatch(templatesActions.setTemplateEditedSection(data.data.section));
                }
                if (data?.data?.sections) {
                    dispatch(templatesActions.setTemplateSections(data.data.sections));
                }
                return data;
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
