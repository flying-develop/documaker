import { slugify } from 'transliteration';

export const getTagName = (title: string, length: number = 20): string => {
    return slugify(title, { lowercase: false, separator: '_' })
        .replace(/[^a-z0-9_]/gi, '')
        .slice(0, length);
};
