import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useAppDispatch } from '&/app/providers/Store';
import { createTemplate } from '&/entities/Template/model/services/createTemplate';
import cn from './AddTemplate.module.scss';

const AddTemplate: FC = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setTitle(evt.target.value);
    };

    const createTemplateHandler = useCallback(() => {
        if (title) {
            dispatch(createTemplate(title));
            setTitle('');
            setOpen(false);
        }
    }, [dispatch, title]);

    return (
        <>
            <Button
                type="primary"
                size="large"
                onClick={() => setOpen(true)}
                className={cn.button}
            >Create Template</Button>

            <Modal
                title="New template"
                open={open}
                onOk={createTemplateHandler}
                onCancel={() => setOpen(false)}
                okText="Create"
                cancelText="Cancel"
            >
                <div className={cn.modalContent}>
                    <Input placeholder="name" value={title} onChange={titleHandler} />
                </div>
            </Modal>
        </>
    );
};

export default AddTemplate;
