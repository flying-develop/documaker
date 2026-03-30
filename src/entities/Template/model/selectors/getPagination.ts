import { RootState } from '&/app/providers/Store/config/reducer';

export const getPagination = (state: RootState) => state.templates.pagination;
