import { PayloadAction } from '@reduxjs/toolkit';
import { TagSchema } from '../../types/TagSchema';

export const setLoading = (state: TagSchema, { payload }: PayloadAction<number | null>) => {
    state.loadingSection = payload;
};
