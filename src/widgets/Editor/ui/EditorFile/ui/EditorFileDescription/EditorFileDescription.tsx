import { FC, useEffect } from 'react';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LexicalEditor } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useAppSelector } from '&/app/providers/Store';
import { getTemplateCurrentSection } from '&/entities/Template/model/selectors/getTemplateCurrentSection';
import cn from './EditorFileDescription.module.scss';

interface Props {
    setEditor: (editor: LexicalEditor) => void;
}

const EditorFileDescription: FC<Props> = (props) => {
    const { setEditor } = props;
    const [editor] = useLexicalComposerContext();
    const currentSection = useAppSelector(getTemplateCurrentSection);

    useEffect((): any => {
        if (editor) {
            setEditor(editor);
        }
    }, [editor, setEditor]);

    useEffect((): any => {
        console.log('currentSection', currentSection);
        if (currentSection?.description && editor) {
            editor.setEditorState(editor.parseEditorState(currentSection.description));
        }
    }, [currentSection, editor]);

    return (
        <div className={cn.wrapper}>
            <RichTextPlugin
                contentEditable={
                    <div>
                        <ContentEditable className={cn.contentEditable} />
                    </div>
                }
                placeholder={<span className={cn.placeholder}>Enter some text...</span>}
                ErrorBoundary={LexicalErrorBoundary}
            />
        </div>
    );
};

export default EditorFileDescription;
