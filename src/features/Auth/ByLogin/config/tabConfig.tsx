export enum TabKeys {
    EMAIL = 'AuthEmail',
    PHONE = 'AuthPhone',
}

export const TabLabel = {
    [TabKeys.EMAIL]: 'E-mail',
    [TabKeys.PHONE]: 'Phone',
};

export const tabItems = [
    {
        value: TabKeys.EMAIL,
        label: TabLabel[TabKeys.EMAIL],
    },
    {
        value: TabKeys.PHONE,
        label: TabLabel[TabKeys.PHONE],
    },
];
