import { TagSchema } from '&/entities/Tag/model/types/TagSchema';
import { getId } from '&/shared/utils';

export const addTagOption = (state: TagSchema) => {
    const options = state.tag.options || [];
    state.tag = {
        ...state.tag,
        options: [
            ...options,
            {
                id: getId('temp_'),
                title: '',
                linked_section: null,
            },
        ],
    };
};
