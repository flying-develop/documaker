import { RootState } from '&/app/providers/Store/config/reducer';
import { treeSearch } from '&/shared/utils';
import { createSelector } from 'reselect';

const find = treeSearch('children');

export const getTemplateSections = (state: RootState) => state.templates.template.sections;

export const getTemplateGlobalSection = createSelector([getTemplateSections], (sections) => {
    if (sections) {
        return find(sections, 'is_global', 1);
    }
    return {};
});
