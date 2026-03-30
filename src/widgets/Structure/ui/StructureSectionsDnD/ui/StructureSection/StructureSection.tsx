import { forwardRef, useCallback, useMemo } from 'react';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import Chip from '&/shared/ui/Chip/Chip';
import { SimpleTreeItemWrapper, TreeItemComponentProps } from 'dnd-kit-sortable-tree';
import { Dropdown, MenuProps } from 'antd';
import { HiDotsVertical } from 'react-icons/hi';
import {
    AddTemplateSubSection,
    CopyTemplateSection,
    DeleteTemplateSection,
    EditTemplateSection,
    LinkTemplateSection,
    ShowTemplateKeyWordParentSection,
} from '&/features/Template';
import { updateTemplateSectionByIdSilence } from '&/entities/Template/model/services/updateTemplateSectionByIdSilence';
import { getTemplateIsCase } from '&/entities/Template/model/selectors/getTemplateIsCase';
import { AiOutlineFile } from 'react-icons/ai';
import { useProfile } from '&/entities/Profile/hooks/useProfile';
import classNames from 'classnames';
import { treeSearch } from '&/shared/utils';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import cn from './StructureSection.module.scss';

const StructureSection = forwardRef<HTMLDivElement, TreeItemComponentProps<TemplateSection>>(
    (props, ref) => {
        const { item: section } = props;
        const dispatch = useAppDispatch();
        const editedSection = useAppSelector(getTemplateEditedSection);
        const isCase = useAppSelector(getTemplateIsCase);
        const template = useAppSelector(getTemplate);
        const { isAdmin, isSuperAdmin } = useProfile();

        const setActiveSection = useCallback(() => {
            if (!section.is_current && section.id && section.petition_id) {
                dispatch(
                    updateTemplateSectionByIdSilence({
                        section: { ...section, is_current: 1 },
                    }),
                );
            } else if (section.is_file && template?.sections) {
                const findSection = treeSearch('children');
                const parentSection = findSection(template.sections, 'id', section.section_id);
                dispatch(
                    updateTemplateSectionByIdSilence({
                        section: { ...parentSection, is_current: 1 },
                    }),
                );
            }
        }, [dispatch, section, template.sections]);

        const setCurrentSectionHandler = useCallback(async () => {
            dispatch(
                updateTemplateSectionByIdSilence({
                    section: editedSection,
                    callback: setActiveSection,
                }),
            );
        }, [dispatch, editedSection, setActiveSection]);

        const items: MenuProps['items'] = useMemo(() => {
            if (section.is_file) {
                return [
                    {
                        key: '1',
                        label: <ShowTemplateKeyWordParentSection section={section} />,
                    },
                    {
                        key: '2',
                        label: <DeleteTemplateSection section={section} />,
                    },
                ];
            }
            return [
                {
                    key: '1',
                    label: <AddTemplateSubSection parent={section} />,
                },
                {
                    key: '2',
                    label: <EditTemplateSection section={section} />,
                },
                {
                    key: '3',
                    label: <CopyTemplateSection section={section} />,
                },
                {
                    key: '4',
                    label: <LinkTemplateSection parent={section} />,
                },
                {
                    key: '5',
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

        const title =
            isAdmin || isSuperAdmin
                ? `${section.title} ID:${section.temp_id || section.id}`
                : section.title;

        let badge;
        if (!!section?.is_multiple) {
            badge = 'Multiple';
        }
        if (!!section?.is_file) {
            badge = `parent: ${section.main_parent_id}`;
        }

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
                    title={
                        <div className={cn.title}>
                            {!!section.is_file && <AiOutlineFile />}
                            <span>{title}</span>
                        </div>
                    }
                    active={!!section.is_current}
                    setActive={setCurrentSectionHandler}
                    filled={isFilled}
                    exhibit={section.is_file}
                    badge={badge}
                    control={
                        !!items.length && (
                            <Dropdown
                                className={cn.dropdown}
                                menu={{ items }}
                                placement="bottomLeft"
                                trigger={['click']}
                            >
                                <span
                                    className={classNames(cn.menu, {
                                        [cn.active]: !!section.is_current,
                                    })}
                                >
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
