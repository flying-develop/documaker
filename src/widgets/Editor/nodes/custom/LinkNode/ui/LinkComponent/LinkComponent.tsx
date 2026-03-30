import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
    $getNodeByKey,
    $getSelection,
    $isNodeSelection,
    COMMAND_PRIORITY_HIGH,
    KEY_ESCAPE_COMMAND,
    NodeKey,
    SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { $isLinkNode } from '../../LinkNode';
import LinkEditor from '../LinkEditor/LinkEditor';
import cn from './LinkComponent.module.scss';

type Props = {
    link: string;
    nodeKey: NodeKey;
};

export default function LinkComponent({ link, nodeKey }: Props): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const [linkValue, setLinkValue] = useState(link);
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const inputRef = useRef(null);

    const onHide = useCallback(
        (restoreSelection?: boolean) => {
            setShowEditor(false);
            editor.update(() => {
                const node = $getNodeByKey(nodeKey);
                if ($isLinkNode(node)) {
                    node.setLink(linkValue);
                    if (restoreSelection) {
                        node.selectNext(0, 0);
                    }
                }
            });
        },
        [editor, linkValue, nodeKey],
    );

    const onDeleteAnchor = useCallback(() => {
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if ($isLinkNode(node)) {
                node.remove();
                setShowEditor(false);
            }
        });
    }, [editor, nodeKey]);

    useEffect(() => {
        if (!showEditor && linkValue !== link) {
            setLinkValue(link);
        }
    }, [showEditor, link, linkValue]);

    useEffect(() => {
        if (showEditor) {
            return mergeRegister(
                editor.registerCommand(
                    SELECTION_CHANGE_COMMAND,
                    () => {
                        const { activeElement } = document;
                        const inputElem = inputRef.current;
                        if (inputElem !== activeElement) {
                            onHide();
                        }
                        return false;
                    },
                    COMMAND_PRIORITY_HIGH,
                ),
                editor.registerCommand(
                    KEY_ESCAPE_COMMAND,
                    () => {
                        const { activeElement } = document;
                        const inputElem = inputRef.current;
                        if (inputElem === activeElement) {
                            onHide(true);
                            return true;
                        }
                        return false;
                    },
                    COMMAND_PRIORITY_HIGH,
                ),
            );
        } else {
            return editor.registerUpdateListener(({ editorState }) => {
                const isSelected = editorState.read(() => {
                    const selection = $getSelection();
                    return (
                        $isNodeSelection(selection) &&
                        selection.has(nodeKey) &&
                        selection.getNodes().length === 1
                    );
                });
                if (isSelected) {
                    setShowEditor(true);
                }
            });
        }
    }, [editor, nodeKey, onHide, setShowEditor, showEditor]);

    return (
        <div className={cn.container}>
            {showEditor && (
                <LinkEditor
                    link={linkValue}
                    setLink={setLinkValue}
                    onDelete={onDeleteAnchor}
                    onSubmit={onHide}
                    ref={inputRef}
                />
            )}
            <span onDoubleClick={() => setShowEditor(true)} className={cn.anchor}>
                <span className={cn.pin}>
                    <AiOutlineLink size={14} />
                </span>
                <span>{link}</span>
            </span>
        </div>
    );
}
