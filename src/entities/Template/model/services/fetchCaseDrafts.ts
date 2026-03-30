import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Template } from '../types/Template';

export const fetchCaseDrafts = createAsyncThunk<any, Template>(
    'templates/fetchCaseDrafts',
    async (template: Template, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.CASES,
                    path: [template.id as number, Endpoints.DRAFTS],
                }),
            });
            const { data } = await api.get(url);

            return { data, parent: template };
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
