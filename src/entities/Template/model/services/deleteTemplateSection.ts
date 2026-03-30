import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTemplateSections } from '&/entities/Template/model/services/fetchTemplateSections';

interface Params {
    node: number;
    id: number;
}
export const deleteTemplateSection = createAsyncThunk<any, Params>(
    'templates/deleteTemplateSection',
    async (params, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.SECTIONS,
                    path: [params.id],
                }),
            });
            const { data } = await api.delete(url);
            dispatch(fetchTemplateSections({ node: params.node }));
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
