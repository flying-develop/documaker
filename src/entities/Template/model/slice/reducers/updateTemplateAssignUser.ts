import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '&/entities/User/model/types/User';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const updateTemplateAssignUser = (
    state: TemplatesSchema,
    { payload }: PayloadAction<User>,
) => {
    state.assignUsers = state.assignUsers.map((user) => {
        if (user.id === payload.id) {
            return {
                ...user,
                ...payload,
            };
        }
        return user;
    });
};
