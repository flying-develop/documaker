import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '&/app/providers/Store/config/reducer';
import { api, combineUrl, Endpoints, getUrl, Services } from '&/shared/api';

export const saveTemplateCaseDraft = createAsyncThunk<any>(
    'templates/saveTemplateCaseDraft',
    async (_, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const state = getState() as RootState;
        const {
            templates: { template },
        } = state;

        try {
            if (template?.id) {
                const url = getUrl({
                    service: Services.PETITIONS,
                    endpoint: combineUrl({
                        endpoint: Endpoints.CASES,
                        path: [template.id, Endpoints.DRAFT_SAVE],
                    }),
                });
                const { data } = await api.patch(url, template);
                return data.data;
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
