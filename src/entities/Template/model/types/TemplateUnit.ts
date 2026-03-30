import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';

export interface TemplateUnitVariant {
    id: number | string;
}

export interface TemplateUnit {
    id?: number | string;
    sort?: number;
    title?: string;
    current_variant?: string | number;
    current_state?: string;
    is_file?: boolean | number;
    is_section?: boolean | number;
    variants?: TemplateUnitVariant[];
    linked_id?: number | null;
    section_id?: number | null;
    pdf_linked_id?: number | null;
    original_id?: number | null;
    linked_section?: TemplateSection | null;
    pdf_section?: TemplateSection | null;
}
