import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, NodeKey } from 'lexical';
import { useCallback } from 'react';
import { $isKeyWordNode } from '&/widgets/Editor/nodes/custom/KeyWordNode/KeyWordNode';
import cn from './KeyWordComponent.module.scss';

type Props = {
    keyWord: string;
    nodeKey: NodeKey;
};

export default function KeyWordComponent({ keyWord, nodeKey }: Props): JSX.Element {
    const [editor] = useLexicalComposerContext();

    const onDeleteKeyWord = useCallback(() => {
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if ($isKeyWordNode(node)) {
                node.remove();
            }
        });
    }, [editor, nodeKey]);

    return (
        <span className={cn.container}>
            <span onDoubleClick={onDeleteKeyWord} className={cn.keyWord}>
                <span>{keyWord}</span>
            </span>
        </span>
    );
}
