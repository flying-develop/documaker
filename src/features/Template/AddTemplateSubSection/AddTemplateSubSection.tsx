import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Input, Modal, Segmented } from 'antd';
import { SegmentedValue } from 'rc-segmented';
import { AiOutlinePlus } from 'react-icons/ai';
import {
    TemplateSection,
    TemplateSectionType,
} from '&/entities/Template/model/types/TemplateSection';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import { createTemplateSection } from '&/entities/Template/model/services/createTemplateSection';
import cn from './AddTemplateSubSection.module.scss';

interface AddTemplateSubSectionProps {
    parent: TemplateSection;
}

const AddTemplateSubSection: FC<AddTemplateSubSectionProps> = ({ parent }) => {
    const dispatch = useAppDispatch();
    const template = useAppSelector(getTemplate);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<TemplateSectionType>('single');
    const [title, setTitle] = useState('');

    const multipleHandler = (value: SegmentedValue) => {
        setType(value as TemplateSectionType);
    };

    const nameHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setTitle(evt.target.value);
    };

    const addSectionHandler = useCallback(() => {
        dispatch(
            createTemplateSection({
                title,
                parent: parent.id,
                is_multiple: type === 'multiple' ? 1 : 0,
                node: Number(template.id),
            }),
        );
        setTitle('');
        setOpen(false);
    }, [dispatch, parent, template.id, title, type]);
    return (
        <>
            <div onClick={() => setOpen(true)} className={cn.row}>
                <AiOutlinePlus />
                <span>Add subsection</span>
            </div>
            <Modal
                title="New section"
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
                    <Input placeholder="name" value={title} onChange={nameHandler} />
                </div>
            </Modal>
        </>
    );
};

export default AddTemplateSubSection;
