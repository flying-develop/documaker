import { FC, PropsWithChildren, useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalEditor, SerializedEditorState } from 'lexical';
import { HashtagNode } from '@lexical/hashtag';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { Tag } from '&/entities/Tag/model/types/Tag';
import lexicalEditorTheme from '&/widgets/Editor/themes/theme';
import { useAppDispatch } from '&/app/providers/Store';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import EditorTag from '&/widgets/Editor/ui/EditorTag/EditorTag';
import { AnchorLinkPlugin, CustomOnChangePlugin } from '&/widgets/Editor/plugins/custom';
import { AnchorLinkNode, AnchorNode, YouTubeNode } from '&/widgets/Editor/nodes/custom';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { TableContext } from '&/widgets/Editor/plugins/custom/TablePlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { TableCellResizerPlugin } from '&/widgets/Editor/plugins/custom/TableCellResizer';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { InlineImageNode } from '&/widgets/Editor/nodes/custom/InlineImageNode';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { InlineImagePlugin } from '&/widgets/Editor/plugins/custom/InlineImagePlugin';
import YouTubePlugin from '../../plugins/custom/YouTubePlugin';
import AnchorPlugin from '../../plugins/custom/AnchorPlugin/AnchorPlugin';

interface EditorWrapperProps {
    section: TemplateSection;
    tag: Tag;
    setEditor: (editor: LexicalEditor) => void;
    isClient?: boolean;
}

const onError = (error: Error): void => {
    console.error(error);
};

const initialConfig = {
    namespace: 'Blank',
    theme: lexicalEditorTheme,
    onError,
    className: 'editor',
    nodes: [
        HashtagNode,
        HeadingNode,
        QuoteNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        InlineImageNode,
        AutoLinkNode,
        LinkNode,
        AnchorNode,
        AnchorLinkNode,
        YouTubeNode,
    ],
};

const EditorBlankWrapper: FC<PropsWithChildren<EditorWrapperProps>> = (props) => {
    const { section, tag, setEditor, isClient, children } = props;
    const dispatch = useAppDispatch();

    const onChange = useCallback(
        (state: SerializedEditorState) => {
            if (tag.id) {
                const tag_data = section.tag_data || {};
                dispatch(
                    templatesActions.updateTemplateSection({
                        tag_data: {
                            ...tag_data,
                            [tag.id]: JSON.stringify(state),
                        },
                    }),
                );
            }
        },
        [dispatch, section, tag],
    );
    if (isClient) {
        return (
            <LexicalComposer
                initialConfig={{
                    ...initialConfig,
                    editable: false,
                }}
                key={tag.id}
            >
                <EditorTag isClient={isClient} setEditor={setEditor} tag={tag} section={section} />
            </LexicalComposer>
        );
    }

    return (
        <LexicalComposer initialConfig={initialConfig} key={tag.id}>
            <TableContext>
                <>
                    <TablePlugin hasCellMerge hasCellBackgroundColor={false} />
                    <TableCellResizerPlugin />
                    <EditorTag setEditor={setEditor} tag={tag} section={section}>
                        {children}
                    </EditorTag>
                    <CustomOnChangePlugin onChange={onChange} />
                    <HistoryPlugin />
                    <YouTubePlugin />
                    <LinkPlugin />
                    <InlineImagePlugin />
                    <AnchorPlugin />
                    <AnchorLinkPlugin />
                </>
            </TableContext>
        </LexicalComposer>
    );
};

export default EditorBlankWrapper;
