import {TemplatesSchema} from '../../types/TemplatesSchema';


export const resetTemplateEditedSection = (state: TemplatesSchema) => {
    state.editedSection = {}
};
