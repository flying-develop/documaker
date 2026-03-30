import {TemplatesSchema} from '../../types/TemplatesSchema';
import {PayloadAction} from "@reduxjs/toolkit";


export const setTemplateIsGlobalTags = (state: TemplatesSchema, {payload}: PayloadAction<boolean>) => {
    state.isGlobalTags = payload
};
