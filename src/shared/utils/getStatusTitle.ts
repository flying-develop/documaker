import { TemplateStatuses } from '&/entities/Template/model/types/TemplateStatus';
import { TemplateCaseStatuses } from '&/entities/Template/model/types/TemplateCaseStatus';

export const getStatusTitle = (status?: string | number): string | number => {
    if (!status) {
        return '';
    }
    const currentStatus = [...TemplateStatuses, ...TemplateCaseStatuses].find(
        ({ code }) => status === code,
    );
    if (!currentStatus) {
        return '';
    }
    return currentStatus.title as string;
};
