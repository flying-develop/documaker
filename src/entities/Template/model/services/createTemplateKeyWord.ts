import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateKeyWord } from '&/entities/Template/model/types/TemplateKeyWord';

export const createTemplateKeyWord = createAsyncThunk<any, TemplateKeyWord>(
    'templates/createTemplateKeyWord',
    async (keyWord, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const url = getUrl({
                service: Services.PETITIONS,
                endpoint: combineUrl({
                    endpoint: Endpoints.KEY_WORDS,
                }),
            });
            const { data } = await api.post(url, keyWord);

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
