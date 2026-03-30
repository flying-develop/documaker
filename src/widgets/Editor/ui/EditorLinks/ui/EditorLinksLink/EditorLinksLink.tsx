import { SelectTemplateSection } from '&/features/Template';
import { FC, useCallback } from 'react';
import {
    TemplateSection,
    TemplateSectionAnchor,
} from '&/entities/Template/model/types/TemplateSection';
import { INSERT_LINK_COMMAND } from '&/widgets/Editor/plugins/custom/AnchorLinkPlugin/AnchorLinkPlugin';

interface Props {
    editor: any;
    onCancel: () => void;
}

const EditorLinksLink: FC<Props> = (props) => {
    const { editor, onCancel } = props;

    const createLinkBySectionHandler = useCallback(
        (section: TemplateSection) => {
            if (editor) {
                editor.dispatchCommand(INSERT_LINK_COMMAND, {
                    text: section.title,
                    id: `section-${section.id}`,
                });
                onCancel();
            }
        },
        [editor, onCancel],
    );

    const createLinkByAnchorHandler = useCallback(
        (anchor: TemplateSectionAnchor) => {
            if (editor) {
                editor.dispatchCommand(INSERT_LINK_COMMAND, {
                    text: anchor.title,
                    id: `anchor-${anchor.id}`,
                });
                onCancel();
            }
        },
        [editor, onCancel],
    );

    return (
        <div>
            <SelectTemplateSection
                onSelect={createLinkBySectionHandler}
                onAnchorSelect={createLinkByAnchorHandler}
                title="Create link"
                isLinks
                fullTree
            />
        </div>
    );
};

export default EditorLinksLink;
