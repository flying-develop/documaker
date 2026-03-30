import { PayloadAction } from '@reduxjs/toolkit';
import { TemplateKeyWord } from '&/entities/Template/model/types/TemplateKeyWord';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const addTemplateKeyWord = (
    state: TemplatesSchema,
    { payload }: PayloadAction<TemplateKeyWord>,
) => {
    state.keyWords = [
        ...state.keyWords.filter((keyWord) => keyWord.code !== payload.code),
        payload,
    ];
};
