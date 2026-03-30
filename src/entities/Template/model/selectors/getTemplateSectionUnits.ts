import { createSelector } from 'reselect';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import { getTemplateCurrentSection } from '&/entities/Template/model/selectors/getTemplateCurrentSection';

export const getTemplateSectionUnits = createSelector(
    [getTemplate, getTemplateCurrentSection],
    (template, sectionId) => {
        const section = template.sections?.find((section) => section.id === sectionId);
        if (section) {
            return section.units;
        }
        return [];
    },
);
