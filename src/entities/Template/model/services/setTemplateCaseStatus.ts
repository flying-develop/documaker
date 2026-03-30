import { api, combineUrl, Endpoints, getUrl, Services } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateStatus } from '&/entities/Template/model/types/TemplateStatus';
import { TemplateCaseStatus } from '&/entities/Template/model/types/TemplateCaseStatus';

export const setTemplateCaseStatus = createAsyncThunk<
    any,
    { id: string | number; status: TemplateStatus | TemplateCaseStatus; isCase?: boolean }
>('templates/setTemplateCaseStatus', async ({ id, status }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const url = getUrl({
            service: Services.PETITIONS,
            endpoint: combineUrl({
                endpoint: Endpoints.CASES,
                path: [id, Endpoints.SET_STATUS],
            }),
        });

        const { data } = await api.patch(url, { status });
        return data.data;
    } catch (err) {
        return rejectWithValue(err);
    }
});
