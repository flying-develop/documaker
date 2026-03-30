import { api, getUrl, Services } from '&/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Tag } from '&/entities/Tag/model/types/Tag';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { updateTemplateSectionBlank } from '&/entities/Template/model/services/updateTemplateSectionBlank';

interface UploadData {
    file: File;
    tag: Tag;
    section: TemplateSection;
}

export const uploadTemplateSectionFile = createAsyncThunk<any, UploadData>(
    'calculation/uploadTemplateSectionFile',
    async (uploadDFata, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        const { file, tag, section } = uploadDFata;
        const formData = new FormData();
        formData.append('file', file, file.name);
        try {
            const url = getUrl({
                service: Services.UPLOAD,
                endpoint: '',
            });
            const { data } = await api.post(url, formData);
            if (data.data) {
                const payload = {
                    ...section,
                    tags: section.tags?.map((t) => {
                        if (t.id === tag.id) {
                            return {
                                ...t,
                                default_value: data.data,
                            };
                        }
                        return t;
                    }),
                };
                dispatch(updateTemplateSectionBlank({ section: payload }));
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
