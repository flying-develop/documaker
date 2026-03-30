/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import {
    $getNodeByKey,
    $getSelection,
    $isNodeSelection,
    $isRangeSelection,
    CLICK_COMMAND,
    COMMAND_PRIORITY_LOW,
    DRAGSTART_COMMAND,
    KEY_BACKSPACE_COMMAND,
    KEY_DELETE_COMMAND,
    SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';

import type { BaseSelection, LexicalEditor, NodeKey } from 'lexical';
import type { Position } from '&/widgets/Editor/plugins/custom/InlineImagePlugin';

import {
    UpdateInlineImageBody,
    UpdateInlineImageFooter,
} from '&/widgets/Editor/plugins/custom/InlineImagePlugin';
import { RIGHT_CLICK_IMAGE_COMMAND } from '&/widgets/Editor/commands';
import ImageResizer from './ImageResizer';
import { useModal } from '../../../../hooks/useModal';
import { $isInlineImageNode } from './InlineImageNode';

import './InlineImageNode.css';

const imageCache = new Set();

function useSuspenseImage(src: string) {
    if (!imageCache.has(src)) {
        throw new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imageCache.add(src);
                resolve(null);
            };
        });
    }
}

function LazyImage({
    className,
    imageRef,
    src,
    width,
    height,
    position,
    maxWidth,
}: {
    className: string | null;
    height: 'inherit' | number;
    imageRef: { current: null | HTMLImageElement };
    src: string;
    width: 'inherit' | number;
    position: Position;
    maxWidth: number;
}): JSX.Element {
    useSuspenseImage(src);
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
            className={className || undefined}
            src={src}
            ref={imageRef}
            data-position={position}
            style={{
                display: 'block',
                height,
                width,
                maxWidth,
            }}
            draggable="false"
        />
    );
}

export default function InlineImageComponent({
    src,
    nodeKey,
    width,
    height,
    position,
    resizable,
    maxWidth,
}: {
    height: 'inherit' | number;
    nodeKey: NodeKey;
    src: string;
    width: 'inherit' | number;
    position: Position;
    resizable: boolean;
    maxWidth: number;
}): JSX.Element {
    const [modal, createModal] = useModal();
    const imageRef = useRef<null | HTMLImageElement>(null);
    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
    const [editor] = useLexicalComposerContext();
    const [selection, setSelection] = useState<BaseSelection | null>(null);
    const activeEditorRef = useRef<LexicalEditor | null>(null);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    const onDelete = useCallback(
        (payload: KeyboardEvent) => {
            if (isSelected && $isNodeSelection($getSelection())) {
                const event: KeyboardEvent = payload;
                event.preventDefault();
                const node = $getNodeByKey(nodeKey);
                if ($isInlineImageNode(node)) {
                    node.remove();
                    return true;
                }
            }
            return false;
        },
        [isSelected, nodeKey],
    );

    const onClick = useCallback(
        (payload: MouseEvent) => {
            const event = payload;

            if (isResizing) {
                return true;
            }
            if (event.target === imageRef.current) {
                if (event.shiftKey) {
                    setSelected(!isSelected);
                } else {
                    clearSelection();
                    setSelected(true);
                }
                return true;
            }

            return false;
        },
        [isResizing, isSelected, setSelected, clearSelection],
    );

    const onRightClick = useCallback(
        (event: MouseEvent): void => {
            editor.getEditorState().read(() => {
                const latestSelection = $getSelection();
                const domElement = event.target as HTMLElement;
                if (
                    domElement.tagName === 'IMG' &&
                    $isRangeSelection(latestSelection) &&
                    latestSelection.getNodes().length === 1
                ) {
                    editor.dispatchCommand(RIGHT_CLICK_IMAGE_COMMAND, event as MouseEvent);
                }
            });
        },
        [editor],
    );

    useEffect(() => {
        let isMounted = true;
        const rootElement = editor.getRootElement();
        const unregister = mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                if (isMounted) {
                    setSelection(editorState.read(() => $getSelection()));
                }
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_, activeEditor) => {
                    activeEditorRef.current = activeEditor;
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand<MouseEvent>(CLICK_COMMAND, onClick, COMMAND_PRIORITY_LOW),
            editor.registerCommand<MouseEvent>(
                RIGHT_CLICK_IMAGE_COMMAND,
                onClick,
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand<MouseEvent>(
                CLICK_COMMAND,
                (payload) => {
                    const event = payload;
                    if (event.target === imageRef.current) {
                        if (event.shiftKey) {
                            setSelected(!isSelected);
                        } else {
                            clearSelection();
                            setSelected(true);
                        }
                        return true;
                    }

                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                DRAGSTART_COMMAND,
                (event) => {
                    if (event.target === imageRef.current) {
                        event.preventDefault();
                        return true;
                    }
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
            editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
        );

        rootElement?.addEventListener('contextmenu', onRightClick);

        return () => {
            isMounted = false;
            unregister();
            rootElement?.removeEventListener('contextmenu', onRightClick);
        };
    }, [clearSelection, editor, isSelected, nodeKey, onClick, onDelete, onRightClick, setSelected]);

    const draggable = isSelected && $isNodeSelection(selection);
    const isFocused = isSelected;

    const onResizeEnd = (nextWidth: 'inherit' | number, nextHeight: 'inherit' | number) => {
        setTimeout(() => {
            setIsResizing(false);
        }, 200);

        editor.update(() => {
            const node = $getNodeByKey(nodeKey);

            if ($isInlineImageNode(node)) {
                node.setWidthAndHeight(nextWidth, nextHeight);
            }
        });
    };

    const onResizeStart = () => {
        setIsResizing(true);
    };

    return (
        <Suspense fallback={null}>
            <>
                <div draggable={draggable}>
                    <Button
                        icon={<MdOutlineModeEditOutline />}
                        className="image-edit-button"
                        onClick={() => {
                            createModal(
                                'Update Inline Image',
                                true,
                                () => (
                                    <UpdateInlineImageBody
                                        activeEditor={editor}
                                        nodeKey={nodeKey}
                                    />
                                ),
                                (onClose) => (
                                    <UpdateInlineImageFooter
                                        onClose={onClose}
                                        activeEditor={editor}
                                        nodeKey={nodeKey}
                                    />
                                ),
                            );
                        }}
                    >
                        Edit
                    </Button>
                    <LazyImage
                        className={
                            isFocused
                                ? `focused ${$isNodeSelection(selection) ? 'draggable' : ''}`
                                : null
                        }
                        src={src}
                        imageRef={imageRef}
                        width={width}
                        height={height}
                        position={position}
                        maxWidth={maxWidth}
                    />
                </div>
                {resizable && $isNodeSelection(selection) && isFocused && (
                    <ImageResizer
                        editor={editor}
                        imageRef={imageRef}
                        maxWidth={maxWidth}
                        onResizeStart={onResizeStart}
                        onResizeEnd={onResizeEnd}
                    />
                )}
            </>
            {modal}
        </Suspense>
    );
}
