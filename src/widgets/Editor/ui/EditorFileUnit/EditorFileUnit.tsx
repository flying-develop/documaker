import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { AiOutlineClose, AiOutlineFileAdd } from 'react-icons/ai';
import { Button, Card, Dropdown, MenuProps, Modal } from 'antd';
import { HiDotsVertical } from 'react-icons/hi';
import { DeleteTemplateSectionUnit, SelectTemplateSection } from '&/features/Template';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { setTemplateSectionUnitPdfSection } from '&/entities/Template/model/services/setTemplateSectionUnitPdfSection';
import cn from './EditorFileUnit.module.scss';

interface FileUnitProps {
    unit: TemplateUnit;
}

const EditorFileUnit: FC<PropsWithChildren<FileUnitProps>> = (props) => {
    const { unit, children } = props;
    const dispatch = useAppDispatch();
    const editedSection = useAppSelector(getTemplateEditedSection);

    const [open, setOpen] = useState(false);

    const onModal = () => setOpen((prev) => !prev);

    const items: MenuProps['items'] = useMemo(() => {
        return [
            // {
            //     key: '1',
            //     label: <EditTemplateSectionFile unit={unit} />,
            // },
            {
                key: '2',
                label: <DeleteTemplateSectionUnit unit={unit} />,
            },
        ];
    }, [unit]);

    const onDeleteSection = useCallback(() => {
        dispatch(setTemplateSectionUnitPdfSection({ unit, section: editedSection }));
    }, [dispatch, editedSection, unit]);

    const onSetSection = useCallback(
        (section: TemplateSection) => {
            dispatch(setTemplateSectionUnitPdfSection({ unit, section }));
            setOpen(false);
        },
        [dispatch, unit],
    );

    return (
        <div className={cn.container}>
            <Card classNames={{ body: cn.unit }} hoverable style={{ marginTop: 0 }}>
                <div className={cn.controls}>
                    {children}
                    <AiOutlineFileAdd size={20} />
                </div>
                <span>{unit.title}</span>
                <Dropdown menu={{ items }} placement="bottomLeft" trigger={['click']}>
                    <span className={cn.menu}>
                        <HiDotsVertical size={14} />
                    </span>
                </Dropdown>
            </Card>
            {unit.pdf_section?.id && unit.pdf_section?.id !== unit.section_id ? (
                <Card classNames={{ body: cn.section }} style={{ marginTop: 0 }}>
                    <span>{unit.pdf_section.title}</span>
                    <Button
                        type="primary"
                        onClick={onDeleteSection}
                        className={cn.close}
                        icon={<AiOutlineClose />}
                    />
                </Card>
            ) : (
                <Button className={cn.button} onClick={onModal}>
                    Set section
                </Button>
            )}
            {open && (
                <Modal title="Insert Link" open onCancel={onModal} footer={null}>
                    <SelectTemplateSection onSelect={onSetSection} title="Set section" fullTree />
                </Modal>
            )}
        </div>
    );
};

export default EditorFileUnit;
