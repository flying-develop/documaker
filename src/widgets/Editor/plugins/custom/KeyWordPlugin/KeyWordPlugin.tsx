import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement } from '@lexical/utils';
import {
    $createParagraphNode,
    $insertNodes,
    $isRootOrShadowRoot,
    COMMAND_PRIORITY_EDITOR,
    createCommand,
    LexicalCommand,
} from 'lexical';
import { useEffect } from 'react';
import {
    $createKeyWordNode,
    KeyWordNode,
} from '&/widgets/Editor/nodes/custom/KeyWordNode/KeyWordNode';

type CommandPayload = {
    text: string;
    id: string;
};

export const INSERT_KEY_WORD_COMMAND: LexicalCommand<CommandPayload> =
    createCommand('INSERT_KEY_WORD_COMMAND');
export default function KeyWordPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([KeyWordNode])) {
            throw new Error('KeyWordNode not registered on editor');
        }

        return editor.registerCommand<CommandPayload | null>(
            INSERT_KEY_WORD_COMMAND,
            (payload) => {
                if (payload) {
                    const { text, id } = payload;
                    const keyWordNode = $createKeyWordNode(text, id);

                    $insertNodes([keyWordNode]);
                    if ($isRootOrShadowRoot(keyWordNode.getParentOrThrow())) {
                        $wrapNodeInElement(keyWordNode, $createParagraphNode).selectEnd();
                    }
                }
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    return null;
}
