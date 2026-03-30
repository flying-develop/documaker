import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '&/entities/User/model/types/User';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const removeTemplateAssignUser = (
    state: TemplatesSchema,
    { payload }: PayloadAction<User>,
) => {
    state.assignUsers = state.assignUsers.filter((user) => user.id !== payload.id);
};
