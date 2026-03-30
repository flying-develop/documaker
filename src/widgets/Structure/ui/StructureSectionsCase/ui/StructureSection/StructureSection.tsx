import { forwardRef, useCallback, useMemo } from 'react';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import Chip from '&/shared/ui/Chip/Chip';
import { SimpleTreeItemWrapper, TreeItemComponentProps } from 'dnd-kit-sortable-tree';
import { Dropdown, MenuProps } from 'antd';
import { HiDotsVertical } from 'react-icons/hi';
import { AddTemplateSubSection, DeleteTemplateSection } from '&/features/Template';
import { updateTemplateSectionByIdSilence } from '&/entities/Template/model/services/updateTemplateSectionByIdSilence';
import { getTemplateIsBlank } from '&/entities/Template/model/selectors/getTemplateIsBlank';
import { getTemplateIsCase } from '&/entities/Template/model/selectors/getTemplateIsCase';
import { BsCopy } from 'react-icons/bs';
import cn from './StructureSection.module.scss';

const StructureSection = forwardRef<HTMLDivElement, TreeItemComponentProps<TemplateSection>>(
    (props, ref) => {
        const { item: section } = props;
        const dispatch = useAppDispatch();
        const editedSection = useAppSelector(getTemplateEditedSection);
        const isBlank = useAppSelector(getTemplateIsBlank);
        const isCase = useAppSelector(getTemplateIsCase);

        const setActiveSection = useCallback(() => {
            if (!section.is_current && section.id && section.petition_id) {
                // dispatch(setTemplateSectionActive(section.id));
                dispatch(
                    updateTemplateSectionByIdSilence({
                        section: { ...section, is_current: 1 },
                    }),
                );
            }
        }, [dispatch, section]);

        const setCurrentSectionHandler = useCallback(async () => {
            dispatch(
                updateTemplateSectionByIdSilence({
                    section: editedSection,
                    callback: setActiveSection,
                }),
            );
        }, [dispatch, editedSection, setActiveSection]);

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
        }, [isCase, section.tags]);

        return (
            <SimpleTreeItemWrapper
                {...props}
                ref={ref}
                hideCollapseButton
                className={cn.wrapper}
                contentClassName={cn.chip}
                showDragHandle={false}
                disableCollapseOnItemClick
                collapsed={false}
            >
                <Chip
                    title={`${section.title} ID:${section.id}`}
                    active={!!section.is_current}
                    setActive={setCurrentSectionHandler}
                    filled={isFilled}
                    control={
                        isBlank || isCase ? (
                            <>{section?.original_id ? <BsCopy /> : null}</>
                        ) : (
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
            </SimpleTreeItemWrapper>
        );
    },
);
export default StructureSection;
