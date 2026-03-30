import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '&/app/providers/Store/config/reducer';

export const assignTemplate = createAsyncThunk<any>(
    'templates/assignTemplate',
    async (_, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const state = getState() as RootState;
        const {
            templates: { template, assignUsers },
        } = state;

        try {
            if (template.id) {
                const url = getUrl({
                    service: Services.PETITIONS,
                    endpoint: combineUrl({
                        endpoint: Endpoints.TEMPLATES,
                        path: [template.id, Endpoints.ASSIGN],
                    }),
                });
                const payload = {
                    assignUsers,
                };

                const { data } = await api.post(url, payload);

                return data;
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
