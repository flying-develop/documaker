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

export const updateTemplateSectionBlankSilence = createAsyncThunk<any, Props>(
    'templates/updateTemplateSectionBlankSilence',
    async ({ section, callback, reFetch = true }, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;

        try {
            if (section.id) {
                const url = getUrl({
                    service: Services.PETITIONS,
                    endpoint: combineUrl({
                        endpoint: Endpoints.SECTIONS,
                        path: [section.id, Endpoints.BLANK],
                    }),
                });

                const tag_data = section?.tag_data || {};

                const payload = tag_data
                    ? {
                          ...section,
                          tags: section.tags?.map((tag) => {
                              if (tag.id && tag_data[tag.id]) {
                                  return {
                                      ...tag,
                                      description: tag_data[tag.id],
                                  };
                              }
                              return tag;
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
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
