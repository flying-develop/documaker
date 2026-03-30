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
import { AnchorLinkNode } from '&/widgets/Editor/nodes/custom';
import { $createLinkNode } from '&/widgets/Editor/nodes/custom/AnchorLinkNode/AnchorLinkNode';

type CommandPayload = {
    text: string;
    id: string;
};

export const INSERT_LINK_COMMAND: LexicalCommand<CommandPayload> =
    createCommand('INSERT_LINK_COMMAND');
export default function AnchorLinkPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([AnchorLinkNode])) {
            throw new Error('LinkNode not registered on editor');
        }

        return editor.registerCommand<CommandPayload | null>(
            INSERT_LINK_COMMAND,
            (payload) => {
                if (payload) {
                    const { text, id } = payload;
                    const anchorNode = $createLinkNode(text, id);

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
