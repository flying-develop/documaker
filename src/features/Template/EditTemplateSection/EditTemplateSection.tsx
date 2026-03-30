import { ChangeEvent, FC, useCallback, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { Input, Modal, Segmented } from 'antd';
import { useAppDispatch } from '&/app/providers/Store';
import {
    TemplateSection,
    TemplateSectionType,
} from '&/entities/Template/model/types/TemplateSection';
import { SegmentedValue } from 'rc-segmented';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import cn from './EditTemplateSection.module.scss';

interface Props {
    section: TemplateSection;
}

const EditTemplateSection: FC<Props> = (props) => {
    const { section } = props;
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<TemplateSectionType>(
        section.is_multiple ? 'multiple' : 'single',
    );
    const [title, setTitle] = useState(section.title);

    const openSectionHandler = useCallback(() => {
        if (section) {
            setOpen(true);
        }
    }, [section]);

    const cancelHandler = useCallback(() => {
        setOpen(false);
    }, []);

    const nameHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setTitle(evt.target.value);
    };

    const multipleHandler = (value: SegmentedValue) => {
        setType(value as TemplateSectionType);
    };
    const addSection = useCallback(() => {
        dispatch(
            updateTemplateSectionById({
                section: {
                    ...section,
                    is_multiple: type === 'multiple' ? 1 : 0,
                    title,
                },
            }),
        );
        setOpen(false);
    }, [dispatch, section, type, title]);
    return (
        <>
            <div onClick={openSectionHandler} className={cn.row}>
                <AiOutlineEdit />
                <span>Edit section</span>
            </div>
            <Modal
                title="edit section"
                open={open}
                onOk={addSection}
                onCancel={cancelHandler}
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
                        value={type}
                        onChange={multipleHandler}
                    />
                    <Input placeholder="name" value={title} onChange={nameHandler} />
                </div>
            </Modal>
        </>
    );
};

export default EditTemplateSection;
