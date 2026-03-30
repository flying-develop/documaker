export enum TemplateCaseStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    MODERATION = 'MODERATION',
    DONE = 'DONE',
    DELETED = 'DELETED',
}

export const TemplateCaseStatuses = [
    {
        title: 'In progress',
        code: TemplateCaseStatus.IN_PROGRESS,
    },
    {
        title: 'Moderation',
        code: TemplateCaseStatus.MODERATION,
    },
    {
        title: 'Done',
        code: TemplateCaseStatus.DONE,
    },
    {
        title: 'Deleted',
        code: TemplateCaseStatus.DELETED,
    },
];
