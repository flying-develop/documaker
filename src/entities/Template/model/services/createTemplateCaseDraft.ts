import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '&/app/providers/Store/config/reducer';
import { api, combineUrl, Endpoints, getUrl, Services } from '&/shared/api';

export const createTemplateCaseDraft = createAsyncThunk<any>(
    'templates/createTemplateCaseDraft',
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
                        path: [template.id, Endpoints.DRAFT_CREATE],
                    }),
                });
                const { data } = await api.post(url);

                return data.data;
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
