import { FC, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '&/app/providers/Store';
import {
    TemplateSection,
    TemplateSectionAnchor,
    TemplateSectionType,
} from '&/entities/Template/model/types/TemplateSection';
import { Button, List } from 'antd';
import { AiOutlineLeft, AiOutlineLink, AiOutlinePushpin, AiOutlineRight } from 'react-icons/ai';
import classNames from 'classnames';
import { treeSearch } from '&/shared/utils';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import cn from './SelectTemplateSection.module.scss';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';

const find = treeSearch('children');

interface Props {
    onSelect: (section: TemplateSection) => void;
    onAnchorSelect?: (anchor: TemplateSectionAnchor) => void;
    title?: string;
    isLinks?: boolean;
    fullTree?: boolean;
    type?: TemplateSectionType;
    sectionId?: number;
}

const SelectTemplateSection: FC<Props> = (props) => {
    const {
        onSelect,
        onAnchorSelect,
        isLinks,
        sectionId,
        type,
        title = 'Apply',
        fullTree = false,
    } = props;
    const editedSection = useAppSelector(getTemplateEditedSection);
    const template = useAppSelector(getTemplate);
    const [initialSections, setInitialSections] = useState<TemplateSection[]>([]);
    const [sections, setSections] = useState<TemplateSection[]>([]);
    const [anchors, setAnchors] = useState<TemplateSectionAnchor[]>([]);
    const [currentSection, setCurrentSection] = useState<TemplateSection | null>(null);
    const [currentParent, setCurrentParent] = useState<TemplateSection | null>(null);
    const [currentAnchor, setCurrentAnchor] = useState<TemplateSectionAnchor | null>(null);

    useEffect(() => {
        let sections: TemplateSection[] = [];
        if (fullTree) {
            if (template?.sections) {
                sections = template.sections.filter((section) => !section.is_global);
            }
        } else if (editedSection?.children) {
            sections = editedSection.children;
        }
        const filteredSections = sections.filter((section) => !section.is_file);
        setInitialSections(filteredSections);
        setSections(filteredSections);
    }, [template, editedSection, fullTree, type]);

    useEffect(() => {
        if (!fullTree && editedSection?.anchors) {
            setAnchors(editedSection.anchors);
        }
    }, [editedSection, fullTree]);

    const sectionHandler = useCallback(
        (section: TemplateSection) => () => {
            if (section.id !== sectionId) {
                setCurrentSection(section);
                const parent = find(initialSections, 'id', section.parent_id);
                setCurrentParent(parent || null);
                setCurrentAnchor(null);
            }
        },
        [sectionId, initialSections],
    );

    const anchorHandler = useCallback(
        (anchor: TemplateSectionAnchor) => () => {
            setCurrentSection(null);
            setCurrentAnchor(anchor);
        },
        [],
    );

    const childrenHandler = useCallback(
        (section: TemplateSection) => () => {
            const filteredSections = section.children?.filter((section) => !section.is_file);
            setSections(filteredSections || []);
            setCurrentSection(null);
            setCurrentParent(section);
            setCurrentAnchor(null);
            setAnchors(!!section.anchors?.length ? section.anchors : []);
        },
        [],
    );

    const parentHandler = useCallback(() => {
        if (currentParent) {
            setCurrentSection(null);
            const parent = find(initialSections, 'id', currentParent.parent_id);
            setCurrentParent(parent || null);

            const filteredSections = parent?.children?.filter(
                (section: TemplateSection) => !section.is_file,
            );

            setSections(filteredSections || initialSections);
            setAnchors(parent?.anchors || editedSection?.anchors);
            setCurrentAnchor(null);
        }
    }, [currentParent, initialSections, editedSection?.anchors]);

    const selectHandler = useCallback(() => {
        if (currentSection) {
            onSelect(currentSection);
        } else if (onAnchorSelect && currentAnchor) {
            onAnchorSelect(currentAnchor);
        }
    }, [currentAnchor, currentSection, onAnchorSelect, onSelect]);

    return (
        <div>
            {currentParent && (
                <Button onClick={parentHandler} type="text" className={cn.parent}>
                    <AiOutlineLeft />
                    <div>{currentParent.title}</div>
                </Button>
            )}
            <List>
                {sections.map((section) => {
                    return (
                        <List.Item
                            key={section.id}
                            className={classNames(cn.li, {
                                [cn.active]: currentSection?.id === section.id,
                            })}
                        >
                            {isLinks ? (
                                <div
                                    className={classNames({
                                        [cn.active]: currentSection?.id === section.id,
                                    })}
                                    onClick={sectionHandler(section)}
                                >
                                    <i className={cn.pin}>
                                        <AiOutlineLink />
                                    </i>
                                    <span>{section.title}</span>
                                </div>
                            ) : (
                                <div
                                    className={classNames({
                                        [cn.disabled]:
                                            (type &&
                                                (type === 'multiple') === !!section.is_multiple) ||
                                            sectionId === section.id,
                                    })}
                                    onClick={sectionHandler(section)}
                                >
                                    {section.title}
                                </div>
                            )}
                            {(!!section.children?.filter(
                                (section: TemplateSection) => !section.is_file,
                            )?.length ||
                                (onAnchorSelect && !!section.anchors?.length)) && (
                                <Button
                                    onClick={childrenHandler(section)}
                                    type="default"
                                    className={cn.arrow}
                                    icon={<AiOutlineRight />}
                                />
                            )}
                        </List.Item>
                    );
                })}
                {onAnchorSelect &&
                    !!anchors?.length &&
                    anchors.map((anchor) => {
                        return (
                            <List.Item
                                className={classNames(cn.li)}
                                key={anchor.id}
                                onClick={anchorHandler(anchor)}
                            >
                                <div
                                    className={classNames({
                                        [cn.active]: currentAnchor?.id === anchor.id,
                                    })}
                                >
                                    <i className={cn.pin}>
                                        <AiOutlinePushpin />
                                    </i>
                                    <span>{anchor.title}</span>
                                </div>
                            </List.Item>
                        );
                    })}
            </List>
            {(currentSection || currentAnchor) && <Button onClick={selectHandler}>{title}</Button>}
        </div>
    );
};

export default SelectTemplateSection;
