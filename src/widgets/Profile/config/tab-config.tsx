export enum TabKeys {
    INFO = 'info',
    PASS = 'pass',
}

export const TabLabel = {
    [TabKeys.INFO]: 'Information',
    [TabKeys.PASS]: 'Password',
};

export const tabItems = [
    {
        value: TabKeys.INFO,
        label: TabLabel[TabKeys.INFO],
    },
    {
        value: TabKeys.PASS,
        label: TabLabel[TabKeys.PASS],
    },
];
