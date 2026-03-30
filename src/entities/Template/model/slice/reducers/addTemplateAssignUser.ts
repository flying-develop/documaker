import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '&/entities/User/model/types/User';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const addTemplateAssignUser = (state: TemplatesSchema, { payload }: PayloadAction<User>) => {
    state.assignUsers = [...state.assignUsers, payload];
};
