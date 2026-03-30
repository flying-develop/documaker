import { ChangeEvent, FC, useCallback, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { Button, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTag } from '&/entities/Tag/model/selectors/getTag';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import { TagType } from '&/shared/types/TagTypes';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { getTagName } from '&/shared/utils';
import { updateTemplateSectionUnit } from '&/entities/Template/model/services/updateTemplateSectionUnit';
import cn from './EditTemplateSectionFile.module.scss';

interface Props {
    unit: TemplateUnit;
}

const EditTemplateSectionFile: FC<Props> = (props) => {
    const { unit } = props;
    const dispatch = useAppDispatch();
    const editedSection = useAppSelector(getTemplateEditedSection);
    const tag = useAppSelector(getTag);
    const [open, setOpen] = useState(false);

    const openTagHandler = useCallback(() => {
        const tag = editedSection.tags?.find((tag) => tag.title === unit.title);
        if (tag) {
            setOpen(true);
            dispatch(tagsActions.setTag({ ...tag, node: editedSection.petition_id }));
        }
    }, [dispatch, editedSection.petition_id, editedSection.tags, unit.title]);

    const cancelHandler = useCallback(() => {
        setOpen(false);
    }, []);

    const updateFileHandler = useCallback(() => {
        setOpen(false);
        dispatch(updateTemplateSectionUnit({ ...unit, title: tag.title }));
    }, [dispatch, tag.title, unit]);

    const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        const title = evt.target.value;
        dispatch(tagsActions.updateTag({ title, name: getTagName(title, 50) }));
    };

    const isChoice = tag?.type === TagType.CHOICE || tag?.type === TagType.CHOICES;
    const canApplyTag =
        (tag?.type && tag.type !== TagType.CHOICE) ||
        (isChoice && tag?.options?.length && tag.options.length > 1);

    return (
        <>
            <div onClick={openTagHandler} className={cn.row}>
                <AiFillEdit />
                <span>Edit</span>
            </div>
            <Modal
                title="Edit file"
                open={open}
                onCancel={cancelHandler}
                footer={
                    canApplyTag ? (
                        <Button type="primary" onClick={updateFileHandler}>
                            Apply
                        </Button>
                    ) : null
                }
            >
                <div className={cn.content}>
                    <Input value={tag?.title} onChange={titleHandler} />
                </div>
            </Modal>
        </>
    );
};

export default EditTemplateSectionFile;
