import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { fetchTemplateSectionsSilence } from '&/entities/Template/model/services/fetchTemplateSectionsSilence';

interface Props {
    section: TemplateSection;
    reFetch?: boolean;
    callback?: () => void;
}

export const updateTemplateSectionByIdSilence = createAsyncThunk<any, Props>(
    'templates/updateTemplateSectionByIdSilence',
    async ({ section, callback, reFetch = true }, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.SECTIONS,
                    path: [section.id || ''],
                }),
            });

            const section_data = section?.section_data || {};

            const payload = section_data
                ? {
                      ...section,
                      units: section.units?.map((unit) => {
                          if (unit?.variants && unit.current_variant) {
                              return {
                                  ...unit,
                                  current_state: section_data[unit.current_variant],
                              };
                          }
                          return unit;
                      }),
                  }
                : section;
            const { data } = await api.patch(url, payload);
            if (section.petition_id && reFetch) {
                await dispatch(fetchTemplateSectionsSilence({ node: section.petition_id }));
            }
            if (callback) {
                await callback();
            }
            if (data.data) {
                dispatch(templatesActions.setTemplateEditedSection(data.data));
            }
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
