import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Button, Select, Space, Upload } from 'antd';
import { LexicalEditor } from 'lexical';
// eslint-disable-next-line import/no-cycle
import { INSERT_INLINE_IMAGE_COMMAND } from '&/widgets/Editor/commands';
import type { Position } from '&/widgets/Editor/plugins/custom/InlineImagePlugin';
import { ModalContextType, ModalContext } from '&/widgets/Editor/context/ModalContext';
import { IoCloudUploadOutline } from "react-icons/io5";
import { Services, getUrl } from '&/shared/api';
import { getBaseUrl } from '&/shared/api/utils';

const InsertInlineImageBody: FC = () => {
    const { changeData } = useContext<ModalContextType>(ModalContext);
    const [src, setSrc] = useState('');
    const [position, setPosition] = useState<Position>('full');
    const isDisabled = src === '';
    const actionLoad = `${getBaseUrl()}${getUrl({
        service: Services.UPLOAD,
        endpoint: '',
    })}`;


    useEffect(() => {
        changeData({
            src,
            position,
            disabled: isDisabled,
        });
    }, [changeData, isDisabled, position, src]);

    const handleChange = (value: Position) => {
        setPosition(value);
    };

    // Реализация для сохранения картинки в base64
    // const loadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { files } = event.target;

    //     const reader = new FileReader();

    //     reader.onload = () => {
    //         if (typeof reader.result === 'string') {
    //             setSrc(reader.result);
    //         }

    //         return '';
    //     };

    //     if (files !== null) {
    //         reader.readAsDataURL(files[0]);
    //     }
    // };

    const onChange = useCallback((info: any) => {
        const {file} = info;
        if (file.status === 'done') {
            setSrc(file.response.data.url)
        }
    }, []);

    return (
        <>
            <Space direction="vertical">
                <Space.Compact block>
                    <Space direction="horizontal">
                        <Space.Compact block>File Upload:</Space.Compact>
                        <Space.Compact block>
                            <Upload
                                accept="image/png, image/jpeg"
                                name="file"
                                action={actionLoad}
                                onChange={onChange}
                            >
                                <Button icon={<IoCloudUploadOutline />}>Click to Upload</Button>
                            </Upload>
                        </Space.Compact>
                    </Space>
                </Space.Compact>

                <Space.Compact block>
                    <Space direction="horizontal">
                        <Space.Compact block>Set Position:</Space.Compact>
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

const InsertInlineImageFooter: FC<{
    activeEditor: LexicalEditor;
    onClose: () => void;
}> = ({ activeEditor, onClose }) => {
    const context = useContext(ModalContext);

    const handleAccept = useCallback(() => {
        if (context) {
            const payload = { position: context.data.position, src: context.data.src };
            activeEditor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, payload);
        }

        onClose();
    }, [onClose, activeEditor, context]);

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

export { InsertInlineImageBody, InsertInlineImageFooter };
