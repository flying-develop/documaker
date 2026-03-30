import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { Tag } from '&/entities/Tag/model/types/Tag';

export interface TemplateSection {
    anchors?: TemplateSectionAnchor[];
    children?: TemplateSection[];
    current_unit?: string | number;
    data?: string;
    description?: string;
    id?: number | string;
    is_current?: boolean | number;
    is_edited?: boolean;
    is_file?: boolean;
    is_global?: boolean | number;
    is_multiple?: boolean | number;
    level?: number;
    linked_section?: TemplateSection | null;
    main_parent?: TemplateSection;
    main_parent_section?: TemplateSection;
    original_id?: number | null;
    parent?: TemplateSection;
    parent_id?: number | null;
    main_parent_id?: number | null;
    petition_id?: number;
    pdf_title?: string;
    section_data?: Record<string, string> | null;
    section_id?: string | number;
    sort?: number;
    tag_data?: Record<string, string> | null;
    tags?: Tag[];
    temp_id?: string | number;
    title?: string;
    type?: TemplateSectionType;
    units?: TemplateUnit[];
}

export interface TemplateSectionAnchor {
    id: string;
    title: string;
    type: string;
    sort?: number;
}

export type TemplateSectionType = 'single' | 'multiple';
