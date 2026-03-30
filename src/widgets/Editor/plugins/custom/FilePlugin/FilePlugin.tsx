import { Button, Input, Modal } from 'antd';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { createTemplateSectionFile } from '&/entities/Template/model/services/createTemplateSectionFile';
import { getTagName } from '&/shared/utils';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import { TagType } from '&/shared/types/TagTypes';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
// import { createTemplateSection } from '&/entities/Template/model/services/createTemplateSection';

interface FilePluginProps {
    onCancel: () => void;
    unit?: TemplateUnit;
}

const FilePlugin: FC<FilePluginProps> = (props) => {
    const { onCancel, unit } = props;
    const dispatch = useAppDispatch();
    const editedSection = useAppSelector(getTemplateEditedSection);
    const template = useAppSelector(getTemplate);
    const [value, setValue] = useState('');

    const inputHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;
        setValue(value);
    }, []);

    const createFileHandler = useCallback(() => {
        if (editedSection.id) {
            // создать секцию на основе юнита
            dispatch(
                createTemplateSectionFile({
                    tag: {
                        title: value,
                        node: template.id,
                        name: getTagName(value, 50),
                        section: editedSection.id,
                        type: TagType.FILE,
                    },
                    unit,
                }),
            );

            // dispatch(
            //     createTemplateSection({
            //         title: value,
            //         parent: editedSection.id,
            //         is_multiple: 0,
            //         node: Number(template.id),
            //         sortUnit: unit?.sort ? unit.sort + 1 : 100,
            //         is_file: 1,
            //     }),
            // );

            onCancel();
        }
    }, [editedSection, dispatch, value, template, unit, onCancel]);

    return (
        <Modal
            title="New file"
            open
            onCancel={onCancel}
            footer={
                <Button disabled={!value} type="primary" onClick={createFileHandler}>
                    Add
                </Button>
            }
        >
            <Input value={value} onChange={inputHandler} />
        </Modal>
    );
};

export default FilePlugin;
