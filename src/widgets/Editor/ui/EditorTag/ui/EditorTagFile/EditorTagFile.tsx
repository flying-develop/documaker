import { Modal } from 'antd';
import { FC, useCallback, useState } from 'react';
import { Tag } from '&/entities/Tag/model/types/Tag';
import Dropzone from '&/shared/ui/Dropzone/Dropzone';
import { useAppDispatch } from '&/app/providers/Store';
import { uploadTemplateSectionFile } from '&/entities/Template/model/services/uploadTemplateSectionFile';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { UploadFile } from '&/shared/types/UploadFile';
import { deleteTemplateSectionFile } from '&/entities/Template/model/services/deleteTemplateSectionFile';
import { SelectTemplateSection } from '&/features/Template';
import { updateTemplateSectionBlankTag } from '&/entities/Template/model/services/updateTemplateSectionBlankTag';
import cn from './EditorTagFile.module.scss';

interface Props {
    tag: Tag;
    section: TemplateSection;
}

const EditorTagFile: FC<Props> = (props) => {
    const { tag, section } = props;
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const onModal = () => setOpen((prev) => !prev);

    const onDrop = useCallback(
        (files: File[]) => {
            const file = files[0];
            if (file) {
                dispatch(uploadTemplateSectionFile({ file, tag, section }));
            }
        },
        [dispatch, section, tag],
    );

    const onDeleteFile = useCallback(() => {
        dispatch(deleteTemplateSectionFile({ tag, section }));
    }, [dispatch, section, tag]);

    const onSetSection = useCallback(
        (linked_section: TemplateSection) => {
            dispatch(updateTemplateSectionBlankTag({ tag: { ...tag, linked_section }, section }));
        },
        [dispatch, section, tag],
    );

    // const onDeleteSection = useCallback(() => {
    //     dispatch(updateTemplateSectionBlankTag({ tag: { ...tag, linked_section: null }, section }));
    // }, [dispatch, section, tag]);

    const defaultValue = tag.default_value as UploadFile;

    return (
        <div className={cn.tag}>
            {defaultValue ? (
                <Dropzone file={defaultValue} onDelete={onDeleteFile} />
            ) : (
                <Dropzone onDrop={onDrop} />
            )}
            {/*{tag.linked_section ? (*/}
            {/*    <div className={cn.section}>*/}
            {/*        <span>{tag.linked_section.title}</span>*/}
            {/*        <Button*/}
            {/*            onClick={onDeleteSection}*/}
            {/*            className={cn.close}*/}
            {/*            icon={<AiOutlineClose />}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <Button*/}
            {/*        className={cn.button}*/}
            {/*        onClick={onModal}*/}
            {/*        disabled={!editedSection?.children?.length}*/}
            {/*    >*/}
            {/*        Set section*/}
            {/*    </Button>*/}
            {/*)}*/}

            {open && (
                <Modal title="Insert Link" open onCancel={onModal} footer={null}>
                    <SelectTemplateSection onSelect={onSetSection} title="Set section" fullTree />
                </Modal>
            )}
        </div>
    );
};

export default EditorTagFile;
