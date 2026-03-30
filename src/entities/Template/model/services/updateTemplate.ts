import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '&/app/providers/Store/config/reducer';

export const updateTemplate = createAsyncThunk<any>(
    'templates/updateTemplate',
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
                        endpoint: Endpoints.TEMPLATES,
                        path: [template.id],
                    }),
                });
                const { data } = await api.patch(url, template);
                return data;
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
