import { getId } from '&/shared/utils';
import { TemplatesSchema } from '../../types/TemplatesSchema';

export const resetTemplateState = (state: TemplatesSchema) => {
    state.newTemplateId = null;
    state.template = {
        id: getId('temp_'),
        title: '',
        sections: [],
    };
    state.isBlank = false;
    state.isCase = false;
    state.editedSection = {};
    state.newTemplateId = null;
    state.templateTags = [];
    state.isGlobalTags = false;
};
