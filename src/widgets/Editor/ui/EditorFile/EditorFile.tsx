import { FC, useCallback } from 'react';
import { initialConfig } from '&/widgets/Editor/config/initialConfig';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import {
    AnchorLinkPlugin,
    CustomOnChangePlugin,
    HashtagPlugin,
    KeyWordPlugin,
} from '&/widgets/Editor/plugins/custom';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { InlineImagePlugin } from '&/widgets/Editor/plugins/custom/InlineImagePlugin';
import { LexicalEditor, SerializedEditorState } from 'lexical';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { useAppDispatch } from '&/app/providers/Store';
import EditorFileDescription from '&/widgets/Editor/ui/EditorFile/ui/EditorFileDescription/EditorFileDescription';
import EditorFilePdfTitle from '&/widgets/Editor/ui/EditorFile/ui/EditorFilePdfTitle/EditorFilePdfTitle';
import { Card } from 'antd';
import AnchorPlugin from '../../plugins/custom/AnchorPlugin/AnchorPlugin';

import cn from './EditorFile.module.scss';

interface Props {
    setEditor: (editor: LexicalEditor) => void;
}

const EditorFile: FC<Props> = (props) => {
    const { setEditor } = props;
    const dispatch = useAppDispatch();

    const onChange = useCallback(
        (state: SerializedEditorState) => {
            dispatch(
                templatesActions.updateTemplateSection({
                    description: JSON.stringify(state),
                }),
            );
        },
        [dispatch],
    );

    return (
        <Card className={cn.container} styles={{ body: { padding: 10 } }}>
            <EditorFilePdfTitle />
            <LexicalComposer initialConfig={initialConfig}>
                <CustomOnChangePlugin onChange={onChange} />
                <HistoryPlugin />
                <HashtagPlugin />
                <KeyWordPlugin />
                <LinkPlugin />
                <InlineImagePlugin />
                <AnchorPlugin />
                <AnchorLinkPlugin />
                <EditorFileDescription setEditor={setEditor} />
            </LexicalComposer>
        </Card>
    );
};

export default EditorFile;
