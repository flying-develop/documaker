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
import { AiOutlinePushpin } from 'react-icons/ai';
import { $isAnchorNode } from '../../AnchorNode';
import AnchorEditor from '../AnchorEditor/AnchorEditor';
import cn from './AnchorComponent.module.scss';

type Props = {
    anchor: string;
    nodeKey: NodeKey;
};

export default function AnchorComponent({ anchor, nodeKey }: Props): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const [anchorValue, setAnchorValue] = useState(anchor);
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const inputRef = useRef(null);

    const onHide = useCallback(
        (restoreSelection?: boolean) => {
            setShowEditor(false);
            editor.update(() => {
                const node = $getNodeByKey(nodeKey);
                if ($isAnchorNode(node)) {
                    node.setAnchor(anchorValue);
                    if (restoreSelection) {
                        node.selectNext(0, 0);
                    }
                }
            });
        },
        [editor, anchorValue, nodeKey],
    );

    const onDeleteAnchor = useCallback(() => {
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if ($isAnchorNode(node)) {
                node.remove();
                setShowEditor(false);
            }
        });
    }, [editor, nodeKey]);

    useEffect(() => {
        if (!showEditor && anchorValue !== anchor) {
            setAnchorValue(anchor);
        }
    }, [showEditor, anchor, anchorValue]);

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
        <span className={cn.container}>
            {showEditor && (
                <AnchorEditor
                    anchor={anchorValue}
                    setAnchor={setAnchorValue}
                    onDelete={onDeleteAnchor}
                    onSubmit={onHide}
                    ref={inputRef}
                />
            )}
            <span onDoubleClick={() => setShowEditor(true)} className={cn.anchor}>
                <span className={cn.pin}>
                    <AiOutlinePushpin size={14} />
                </span>
                <span>{anchor}</span>
            </span>
        </span>
    );
}
