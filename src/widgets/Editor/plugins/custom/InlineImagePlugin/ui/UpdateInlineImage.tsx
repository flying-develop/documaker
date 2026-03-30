/* eslint-disable import/no-cycle */
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Button, Select, Space } from 'antd';
import { $getNodeByKey, LexicalEditor, NodeKey } from 'lexical';
import type { Position } from '&/widgets/Editor/plugins/custom/InlineImagePlugin';
import { ModalContextType, ModalContext } from '&/widgets/Editor/context/ModalContext';
import { InlineImageNode } from '&/widgets/Editor/nodes/custom/InlineImageNode';

const UpdateInlineImageBody: FC<{activeEditor: LexicalEditor, nodeKey: NodeKey}> = ({activeEditor, nodeKey}) => {
    const editorState = activeEditor.getEditorState();
    const node = editorState.read(() => $getNodeByKey(nodeKey) as InlineImageNode);
    const { changeData } = useContext<ModalContextType>(ModalContext);

    const [position, setPosition] = useState<Position>(node.getPosition());

    const handleChange = (value: Position) => {
        setPosition(value);
    };

    useEffect(() => {
        changeData({
            position,
            disabled: false,
        });
    }, [changeData, position]);

    return (
        <>
            <Space direction="vertical">
                <Space.Compact block>
                    <Space direction="horizontal">
                        <Space.Compact block>Change Position:</Space.Compact>
                        <Space.Compact block>
                            <Select
                                defaultValue={position}
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={[
                                    { value: 'left', label: 'Left' },
                                    { value: 'right', label: 'Right' },
                                    { value: 'full', label: 'Full Width' },
                                    { value: 'center', label: 'Center' },
                                ]}
                            />
                        </Space.Compact>
                    </Space>
                </Space.Compact>
            </Space>
        </>
    );
};

const UpdateInlineImageFooter: FC<{
    activeEditor: LexicalEditor;
    nodeKey: NodeKey,
    onClose: () => void;
}> = ({ activeEditor, nodeKey, onClose }) => {
    const context = useContext(ModalContext);
    const editorState = activeEditor.getEditorState();
    const node = editorState.read(() => $getNodeByKey(nodeKey) as InlineImageNode);

    const handleAccept = useCallback(() => {
        if (context) {
            const payload = { position: context.data.position };

            if (node) {
                activeEditor.update(() => {
                    node.update(payload);
                });
            }
        }

        onClose();
    }, [context, onClose, node, activeEditor]);

    const handleCancel = useCallback(() => {
        onClose();
    }, [onClose]);

    if (!context) {
        return <></>;
    }

    return (
        <>
            <Button type="default" onClick={handleCancel}>
                Cancel
            </Button>
            <Button disabled={context.data.disabled} type="primary" onClick={handleAccept}>
                OK
            </Button>
        </>
    );
};

export { UpdateInlineImageBody, UpdateInlineImageFooter };
