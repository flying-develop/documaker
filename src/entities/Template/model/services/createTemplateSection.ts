import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTemplateSections } from '&/entities/Template/model/services/fetchTemplateSections';
// import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';

interface Params {
    node: number;
    title: string;
    parent?: number | string;
    is_multiple?: boolean | number;
    sortUnit?: number;
    is_file?: number;
}
export const createTemplateSection = createAsyncThunk<any, Params>(
    'templates/createTemplateSection',
    async (params, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;

        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.SECTIONS,
                }),
            });
            const { data } = await api.post(url, params);
            dispatch(fetchTemplateSections({ node: params.node }));
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
