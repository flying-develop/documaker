import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Button, InputNumber, Space } from 'antd';
import { LexicalEditor } from 'lexical';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { ModalContextType, ModalContext } from '&/widgets/Editor/context/ModalContext';

const InsertTableBody: FC = () => {
    const { changeData } = useContext<ModalContextType>(ModalContext);
    const [rows, setRows] = useState(5);
    const [columns, setColumns] = useState(5);

    const handleChangeRows = useCallback((value: number | null) => {
        setRows(value ?? 0);
    }, []);

    const handleChangeColumns = useCallback((value: number | null) => {
        setColumns(value ?? 0);
    }, []);

    useEffect(() => {
        changeData({
            rows,
            columns,
            disabled: !rows || !columns,
        });
    }, [changeData, columns, rows]);

    return (
        <>
            <Space direction="vertical">
                <Space.Compact block>
                    <InputNumber
                        addonBefore="Rows:"
                        min={1}
                        max={10}
                        defaultValue={rows}
                        onChange={handleChangeRows}
                    />
                </Space.Compact>
                <Space.Compact block>
                    <InputNumber
                        addonBefore="Columns:"
                        min={1}
                        max={10}
                        defaultValue={columns}
                        onChange={handleChangeColumns}
                    />
                </Space.Compact>
            </Space>
        </>
    );
};

const InsertTableFooter: FC<{ activeEditor: LexicalEditor; onClose: () => void }> = ({
    activeEditor,
    onClose,
}) => {
    const context = useContext(ModalContext);

    const handleAccept = useCallback(() => {
        if (context) {
            const payload = {
                columns: context.data.columns,
                rows: context.data.rows,
            };
            activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, payload);

            onClose();
        }

        onClose();
    }, [onClose, activeEditor, context]);

    const handleCancel = useCallback(() => {
        onClose();
    }, [onClose]);

    if (!context) {
        return null;
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

export { InsertTableBody, InsertTableFooter };
