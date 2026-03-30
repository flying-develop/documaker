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
import { AnchorNode, $createAnchorNode } from '&/widgets/Editor/nodes/custom/AnchorNode/AnchorNode';

type CommandPayload = {
    text: string;
    id: string;
};

export const INSERT_ANCHOR_COMMAND: LexicalCommand<CommandPayload> =
    createCommand('INSERT_ANCHOR_COMMAND');
export default function AnchorPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([AnchorNode])) {
            throw new Error('AnchorNode not registered on editor');
        }

        return editor.registerCommand<CommandPayload | null>(
            INSERT_ANCHOR_COMMAND,
            (payload) => {
                if (payload) {
                    const { text, id } = payload;
                    const anchorNode = $createAnchorNode(text, id);

                    $insertNodes([anchorNode]);
                    if ($isRootOrShadowRoot(anchorNode.getParentOrThrow())) {
                        $wrapNodeInElement(anchorNode, $createParagraphNode).selectEnd();
                    }
                }
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    return null;
}
