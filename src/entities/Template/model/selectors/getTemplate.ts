import { RootState } from '&/app/providers/Store/config/reducer';

export const getTemplate = (state: RootState) => state.templates.template;
