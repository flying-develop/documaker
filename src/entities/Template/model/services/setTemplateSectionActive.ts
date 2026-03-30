import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';

export const setTemplateSectionActive = createAsyncThunk<any, number | string>(
    'templates/setTemplateSectionActive',
    async (id, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.SECTIONS,
                    path: [id, Endpoints.SET_ACTIVE],
                }),
            });

            const { data } = await api.patch(url);
            if (data?.data) {
                dispatch(templatesActions.setTemplateEditedSection(data.data));
                return data.data;
            }

            return [];
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
