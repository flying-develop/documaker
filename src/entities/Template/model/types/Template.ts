import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { User } from '&/entities/User/model/types/User';
import { TemplateStatus } from '&/entities/Template/model/types/TemplateStatus';
import { TemplateCaseStatus } from '&/entities/Template/model/types/TemplateCaseStatus';

export interface Template {
    id?: string | number;
    title?: string;
    units?: TemplateUnit[];
    sections?: TemplateSection[];
    current_section?: string | number;
    author_id?: number;
    client_id?: number | null;
    created_at?: string;
    deleted_at?: string;
    status?: TemplateStatus | TemplateCaseStatus;
    type?: string;
    updated_at?: string;
    weight?: number;
    client?: User;
    is_draft?: boolean;
    drafts?: Template[]
}
