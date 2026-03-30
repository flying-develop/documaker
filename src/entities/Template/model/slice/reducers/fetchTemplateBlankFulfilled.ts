import { TemplatesSchema } from '&/entities/Template/model/types/TemplatesSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { Tag } from '&/entities/Tag/model/types/Tag';

export const fetchTemplateBlankFulfilled = (
    state: TemplatesSchema,
    { payload }: PayloadAction<{ sections: TemplateSection[]; tags: Tag[] }>,
) => {
    state.template = {
        ...state.template,
        sections: [
            {
                id: 0,
                title: 'Global tags',
                tags: payload.tags,
            },
            ...payload.sections,
        ],
    };
    state.templateTags = payload.tags;
    state.loading = false;
};
