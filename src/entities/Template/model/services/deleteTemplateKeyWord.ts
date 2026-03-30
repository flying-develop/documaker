import { api, Endpoints, getUrl, Services, combineUrl } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateKeyWord } from '&/entities/Template/model/types/TemplateKeyWord';

export const deleteTemplateKeyWord = createAsyncThunk<any, TemplateKeyWord>(
    'templates/deleteTemplateKeyWord',
    async (keyWord, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            if (keyWord?.id) {
                const url = getUrl({
                    service: Services.PETITIONS,
                    endpoint: combineUrl({
                        endpoint: Endpoints.TEMPLATES,
                        path: [Endpoints.KEY_WORDS, keyWord.id],
                    }),
                });
                const { data } = await api.delete(url);
                return data;
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
