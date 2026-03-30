export enum TagType {
    CHOICE = 'choice',
    CHOICES = 'choices',
    TEXT = 'text',
    NUMBER = 'number',
    DATE = 'date',
    FILE = 'file',
}

export const TagTypes = [
    {
        label: 'Radio Buttons',
        key: TagType.CHOICE,
    },
    {
        label: 'Checkboxes',
        key: TagType.CHOICES,
    },
    {
        label: 'Text',
        key: TagType.TEXT,
    },
    {
        label: 'Number',
        key: TagType.NUMBER,
    },
    {
        label: 'Date',
        key: TagType.DATE,
    },
    {
        label: 'File',
        key: TagType.FILE,
    },
];
