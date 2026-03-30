import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '&/app/providers/Store/config/reducer';
import { fetchTemplateSections } from '&/entities/Template/model/services/fetchTemplateSections';

interface Props {
    sectionId: number | string; // секция, к которой привязывают
    linkedSectionId: number | string; // секция, которую привязывают
    callback?: () => void;
    link?: boolean;
}

export const linkTemplateSection = createAsyncThunk<any, Props>(
    'templates/linkTemplateSection',
    async ({ sectionId, linkedSectionId, callback, link = true }, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        const state = getState() as RootState;
        const {
            templates: { template },
        } = state;

        try {
            if (sectionId && template.id) {
                const action = link ? 'link-section' : 'unlink-section';
                const url = getUrl({
                    service: Services.PETITIONS,
                    endpoint: combineUrl({
                        endpoint: Endpoints.SECTIONS,
                        path: [sectionId, action, linkedSectionId],
                    }),
                });

                const { data } = await api.patch(url);

                if (callback) {
                    await callback();
                }
                dispatch(fetchTemplateSections({ node: template.id }));

                return data;
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
