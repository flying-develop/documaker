import { PayloadAction } from '@reduxjs/toolkit';
import { TemplatesSchema } from '../../types/TemplatesSchema';
import { TemplateKeyWord } from '&/entities/Template/model/types/TemplateKeyWord';

export const removeTemplateKeyWord = (
    state: TemplatesSchema,
    { payload }: PayloadAction<TemplateKeyWord>,
) => {
    state.keyWords = [...state.keyWords.filter((keyWord) => keyWord.code !== payload.code)];
};
