import { RootState } from '&/app/providers/Store/config/reducer';
import { api, combineUrl, Endpoints, getUrl, Services } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const copyTemplate = createAsyncThunk<any>(
    'templates/copyTemplate',
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
                        path: [template.id, Endpoints.TEMPLATES_COPY],
                    }),
                });
                const { data } = await api.post(url, template);

                return data;
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
