import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { RootState } from '&/app/providers/Store/config/reducer';

interface Props {
    sections: TemplateSection[];
}

export const updateTemplateSectionSort = createAsyncThunk<any, Props>(
    'templates/updateTemplateSectionSort',
    async ({ sections }, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;

        try {
            const state = getState() as RootState;
            const {
                templates: { editedSection, template },
            } = state;

            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.SECTIONS,
                    path: [Endpoints.SORT],
                }),
            });

            const section_data = editedSection?.section_data || {};

            const section = section_data
                ? {
                      ...editedSection,
                      units: editedSection.units?.map((unit) => {
                          if (unit?.variants && unit.current_variant) {
                              return {
                                  ...unit,
                                  current_state: section_data[unit.current_variant],
                              };
                          }
                          return unit;
                      }),
                  }
                : editedSection;
            const { data } = await api.patch(url, {
                section,
                sections,
                node: template.id,
            });
            if (data?.data?.section) {
                dispatch(templatesActions.setTemplateEditedSection(data.data.section));
            }
            if (data?.data?.sections) {
                dispatch(templatesActions.setTemplateSections(data.data.sections));
            }
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
