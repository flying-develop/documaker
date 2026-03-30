import { FC, HTMLAttributes, useCallback, useMemo, useState } from 'react';
import { Dropdown, MenuProps, Modal } from 'antd';
import { HiDotsVertical } from 'react-icons/hi';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { getTemplateIsBlank } from '&/entities/Template/model/selectors/getTemplateIsBlank';
import { getTemplateIsCase } from '&/entities/Template/model/selectors/getTemplateIsCase';
import { updateTemplateSectionBlank } from '&/entities/Template/model/services/updateTemplateSectionBlank';
import { updateTemplateSectionFill } from '&/entities/Template/model/services/updateTemplateSectionFill';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { AddTemplateSubSection, DeleteTemplateSection } from '&/features/Template';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import Chip from '&/shared/ui/Chip/Chip';
import cn from './StructureSection.module.scss';

interface StructureSectionProps extends HTMLAttributes<HTMLDivElement> {
    section: TemplateSection;
}

const StructureSection: FC<StructureSectionProps> = (props) => {
    const { section } = props;
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const editedSection = useAppSelector(getTemplateEditedSection);
    const isBlank = useAppSelector(getTemplateIsBlank);
    const isCase = useAppSelector(getTemplateIsCase);

    const setActiveSection = useCallback(() => {
        if (!section.is_current && section.id && section.petition_id) {
            dispatch(updateTemplateSectionById({ section: { ...section, is_current: 1 } }));
        }
    }, [dispatch, section]);

    const setCurrentSectionHandler = useCallback(async () => {
        if (editedSection?.id) {
            if (isBlank) {
                await dispatch(
                    updateTemplateSectionBlank({
                        section: editedSection,
                        callback: setActiveSection,
                    }),
                );
            } else if (isCase) {
                await dispatch(
                    updateTemplateSectionFill({
                        section: editedSection,
                        callback: setActiveSection,
                    }),
                );
            } else {
                await dispatch(
                    updateTemplateSectionById({
                        section: editedSection,
                        callback: setActiveSection,
                    }),
                );
            }
        } else {
            setActiveSection();
        }
        if (editedSection?.id && editedSection?.is_edited) {
            setOpen(true);
        }
    }, [dispatch, editedSection, isBlank, isCase, setActiveSection]);

    const saveCurrentSectionHandler = useCallback(async () => {
        if (editedSection?.id) {
            if (isBlank) {
                await dispatch(
                    updateTemplateSectionBlank({
                        section: editedSection,
                        callback: setActiveSection,
                    }),
                );
            } else if (isCase) {
                await dispatch(
                    updateTemplateSectionFill({
                        section: editedSection,
                        callback: setActiveSection,
                    }),
                );
            } else {
                await dispatch(
                    updateTemplateSectionById({
                        section: editedSection,
                        callback: setActiveSection,
                    }),
                );
            }
        } else {
            setActiveSection();
        }
        if (section.id && section.petition_id) {
            setOpen(false);
        }
    }, [
        dispatch,
        editedSection,
        isBlank,
        isCase,
        section.id,
        section.petition_id,
        setActiveSection,
    ]);

    const cancelHandler = useCallback(() => {
        setOpen(false);
        dispatch(templatesActions.resetTemplateEditedSection());
    }, [dispatch]);

    const items: MenuProps['items'] = useMemo(() => {
        return [
            {
                key: '1',
                label: <AddTemplateSubSection parent={section} />,
            },
            {
                key: '2',
                label: <DeleteTemplateSection section={section} />,
            },
        ];
    }, [section]);

    const isFilled = useMemo(() => {
        if (section.tags && isCase) {
            const requiredTags = section.tags.filter((tag) => !!tag.required);
            const filled = section.tags.filter((tag) => {
                const value = tag?.value || tag?.default_value;
                if (tag.type === 'choices' && Array.isArray(value)) {
                    return !!tag.required && !!value?.length;
                }
                return !!tag.required && !!value;
            });
            return filled.length === requiredTags.length;
        }
        return false;
    }, [section.tags]);

    return (
        <>
            <Chip
                key={section.id}
                title={section.title}
                level={section.level}
                active={!!section.is_current}
                setActive={setCurrentSectionHandler}
                filled={isFilled}
                control={
                    isBlank || isCase ? null : (
                        <Dropdown
                            className={cn.dropdown}
                            menu={{ items }}
                            placement="bottomLeft"
                            trigger={['click']}
                        >
                            <span className={cn.menu}>
                                <HiDotsVertical />
                            </span>
                        </Dropdown>
                    )
                }
            />
            <Modal
                title="Save changes?"
                open={open}
                onOk={saveCurrentSectionHandler}
                onCancel={cancelHandler}
                okText="ok"
                cancelText="cancel"
            />
        </>
    );
};

export default StructureSection;
