import { createAsyncThunk } from '@reduxjs/toolkit';
import { Tag } from '&/entities/Tag/model/types/Tag';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { updateTemplateSectionBlank } from '&/entities/Template/model/services/updateTemplateSectionBlank';

interface UploadData {
    tag: Tag;
    section: TemplateSection;
}

export const updateTemplateSectionBlankTag = createAsyncThunk<any, UploadData>(
    'calculation/updateTemplateSectionBlankTag',
    async (uploadDFata, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        const { tag, section } = uploadDFata;

        try {
            const payload = {
                ...section,
                tags: section.tags?.map((t) => {
                    if (t.id === tag.id) {
                        return {
                            ...t,
                            ...tag,
                        };
                    }
                    return t;
                }),
            };
            dispatch(updateTemplateSectionBlank({ section: payload }));
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);
