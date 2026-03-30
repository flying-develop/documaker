import { TagType } from '&/shared/types/TagTypes';
import { UploadFile } from '&/shared/types/UploadFile';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { TemplateKeyWord } from '&/entities/Template/model/types/TemplateKeyWord';

export interface Tag {
    id?: string | number;
    title?: string;
    description?: string;
    name?: string;
    type?: TagType;
    node?: number | string;
    section?: number | string;
    section_id?: number | string;
    petition_id?: number | string;
    required?: boolean;
    label?: string;
    scope?: TagScope;
    options?: TagOption[];
    default_value?: string | number | number[] | UploadFile;
    value?: string | number | number[] | UploadFile;
    isNew?: boolean;
    linked_section?: TemplateSection | null;
    position?: number;
    position_manual?: number;
}

export interface TagOption {
    id?: string | number;
    title?: string;
    linked_section?: TemplateSection | null;
    keywords?: TagOptionKeyword[];
}

export interface TagOptionKeyword {
    id?: string | number;
    keyword: TemplateKeyWord | null;
    value: string;
}

export type TagScope = 'global' | 'local';
