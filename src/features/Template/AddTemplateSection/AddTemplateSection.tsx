import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Button, Input, Modal, Segmented } from 'antd';
import { FiPlusCircle } from 'react-icons/fi';
import { SegmentedValue } from 'rc-segmented';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { TemplateSectionType } from '&/entities/Template/model/types/TemplateSection';
import { createTemplateSection } from '&/entities/Template/model/services/createTemplateSection';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import cn from './AddTemplateSection.module.scss';

const AddTemplateSection: FC = () => {
    const dispatch = useAppDispatch();
    const template = useAppSelector(getTemplate);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<TemplateSectionType>('single');
    const [title, setTitle] = useState('');

    const multipleHandler = (value: SegmentedValue) => {
        setType(value as TemplateSectionType);
    };

    const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setTitle(evt.target.value);
    };

    const addSectionHandler = useCallback(() => {
        dispatch(
            createTemplateSection({
                title,
                is_multiple: type === 'multiple' ? 1 : 0,
                node: Number(template.id),
            }),
        );
        setTitle('');
        setOpen(false);
    }, [dispatch, template, title, type]);
    return (
        <>
            <Button
                type="primary"
                ghost
                onClick={() => setOpen(true)}
                className={cn.button}
                icon={<FiPlusCircle />}
            >
                New section
            </Button>
            <Modal
                title="New subsection"
                open={open}
                onOk={addSectionHandler}
                onCancel={() => setOpen(false)}
                okText="ok"
                cancelText="cancel"
            >
                <div className={cn.modalContent}>
                    <Segmented
                        className={cn.segment}
                        options={[
                            {
                                label: 'Single',
                                value: 'single',
                            },
                            {
                                label: 'Multiple',
                                value: 'multiple',
                            },
                        ]}
                        onChange={multipleHandler}
                    />
                    <Input placeholder="name" value={title} onChange={titleHandler} />
                </div>
            </Modal>
        </>
    );
};

export default AddTemplateSection;
