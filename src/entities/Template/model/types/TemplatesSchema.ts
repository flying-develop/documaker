import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { Tag } from '&/entities/Tag/model/types/Tag';
import { User } from '&/entities/User/model/types/User';
import { PaginationState } from '&/app/types/pagination-meta';
import { TemplateKeyWord } from '&/entities/Template/model/types/TemplateKeyWord';
import { Template } from './Template';

export interface TemplatesSchema {
    error: string | null;
    loading: boolean;
    template: Template;
    templates: Template[];
    templateCase: Template;
    cases: Template[];
    newTemplateId: number | string | null;
    editedSection: TemplateSection;
    templateTags: Tag[];
    isGlobalTags: boolean;
    isBlank: boolean;
    isCase: boolean;
    isDraft: boolean;
    assignUsers: User[];
    sectionFilters: Record<number, number>;
    excludedSections: number[];
    pagination: PaginationState;
    filters: Record<string, string>;
    keyWords: TemplateKeyWord[];
}
