import { useEffect } from 'react';
import { SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface CustomOnChangePluginProps {
    onChange: (state: SerializedEditorState<SerializedLexicalNode>) => void;
}

const CustomOnChangePlugin = (props: CustomOnChangePluginProps) => {
    const { onChange } = props;
    const [editor] = useLexicalComposerContext();
    useEffect((): any => {
        return editor.registerUpdateListener(({ editorState }) => {
            onChange(editorState.toJSON());
        });
    }, [editor, onChange]);
    return null;
};

export default CustomOnChangePlugin;
