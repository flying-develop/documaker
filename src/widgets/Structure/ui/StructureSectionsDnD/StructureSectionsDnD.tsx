import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from 'antd';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateSections } from '&/entities/Template/model/selectors/getTemplateSections';
import { getTemplateIsBlank } from '&/entities/Template/model/selectors/getTemplateIsBlank';
import { getTemplateIsCase } from '&/entities/Template/model/selectors/getTemplateIsCase';
import { SortableTree, TreeItems } from 'dnd-kit-sortable-tree';
import StructureSection from '&/widgets/Structure/ui/StructureSectionsDnD/ui/StructureSection/StructureSection';
import { updateTemplateSectionSort } from '&/entities/Template/model/services/updateTemplateSectionSort';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import { getTemplateCurrentSection } from '&/entities/Template/model/selectors/getTemplateCurrentSection';
import cn from './StructureSections.module.scss';

const filterBy = (
    arr: TreeItems<TemplateSection>,
    query: string,
    property = 'title',
): TreeItems<TemplateSection> => {
    return query
        ? arr.reduce((acc: TreeItems<TemplateSection>, item) => {
              if (item.children?.length) {
                  const filtered = filterBy(item.children, query);
                  if (filtered.length) return [...acc, { ...item, children: filtered }];
              }

              const { ...itemWithoutChildren } = item;
              const value = item[property as keyof TemplateSection];
              return value?.toString().toLowerCase().includes(query.toLowerCase())
                  ? [...acc, itemWithoutChildren]
                  : acc;
          }, [])
        : arr;
};
// const selectSectionExhibits = (section: TemplateSection) => {
//     const node = JSON.parse(JSON.stringify(section));
//     // if (section?.children) {
//     if (!node.children) {
//         node.children = [];
//     }
//     if (section?.units) {
//         const files = section.units
//             .filter((unit) => !!unit.is_file)
//             .map((unit) => ({ ...unit, id: nanoid(), temp_id: unit.id }));
//
//         node.children = _.uniqBy(
//             [...node.children.map((child: any) => selectSectionExhibits(child)), ...files],
//             'id',
//         );
//     }
//     // }
//
//     return node;
// };

// const rollbackSectionExhibits = (section: TemplateSection) => {
//     const node = JSON.parse(JSON.stringify(section));
//     if (!node.children) {
//         node.children = [];
//     }
//     if (!!node.children.length) {
//         const currentChildren = node.children.filter((child: any) => !child.is_file);
//         node.children = [...currentChildren.map((child: any) => rollbackSectionExhibits(child))];
//     }
//     return node;
// };
// const findSection = treeSearch('children');

const StructureSectionsDnD: FC = () => {
    const dispatch = useAppDispatch();
    const templateSections = useAppSelector(getTemplateSections);
    const template = useAppSelector(getTemplate);
    const isBlank = useAppSelector(getTemplateIsBlank);
    const isCase = useAppSelector(getTemplateIsCase);
    const currentSection = useAppSelector(getTemplateCurrentSection);

    const isDraft = !!template?.is_draft;
    const [query, setQuery] = useState('');

    const [treeData, setTreeData] = useState<TreeItems<TemplateSection>>([]);

    const sortSectionHandler = useCallback(
        (
            sections: TreeItems<TemplateSection>,
            //  section: ItemChangedReason<TemplateSection> | any,
        ) => {
            // const sortedSections = JSON.parse(JSON.stringify(sections));
            //
            // const toSection = section.droppedToParent
            //     ? findSection(sortedSections, 'id', section.droppedToParent.id)
            //     : null;
            //
            // const fromSection = section.draggedFromParent
            //     ? findSection(sections, 'id', section.draggedFromParent.id)
            //     : null;
            //
            // const currentSection = section.draggedItem;
            // if (currentSection.is_file) {
            //     if (fromSection) {
            //         fromSection.units = fromSection.units.filter(
            //             (unit: any) => unit.id !== currentSection.id,
            //         );
            //     }
            //     if (toSection) {
            //         toSection.units = [
            //             ...toSection.units,
            //             {
            //                 ...currentSection,
            //                 id: currentSection.temp_id,
            //                 section_id: toSection.id,
            //                 parent: JSON.parse(JSON.stringify(rollbackSectionExhibits(toSection))),
            //             },
            //         ];
            //         toSection.children = toSection.children.filter(
            //             (child: any) => child.id !== currentSection.id,
            //         );
            //     }
            // } else {
            //     const thisSection = findSection(sortedSections, 'id', currentSection.id);
            //     thisSection.children = thisSection.children.filter((child: any) => !child.is_file);
            // }
            // dispatch(
            //     updateTemplateSectionSort({
            //         sections: sortedSections?.map((section: TemplateSection) =>
            //             rollbackSectionExhibits(section),
            //         ),
            //     }),
            // );
            dispatch(updateTemplateSectionSort({ sections }));
            setTreeData(sections);
        },
        [dispatch],
    );

    const searchHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;
        setQuery(value);
    }, []);

    const sections = useMemo(() => {
        switch (true) {
            case isCase && !isDraft:
                return templateSections?.filter((section) =>
                    isCase ? !!section.tags?.length : true,
                );
            case isBlank:
                return templateSections;
            default:
                return templateSections?.filter((section) => !section?.is_global);
        }
    }, [isCase, isDraft, templateSections, isBlank]);

    useEffect(() => {
        setTreeData(sections as TreeItems<TemplateSection>);
        // setTreeData(
        //     sections?.map((section) =>
        //         selectSectionExhibits(section),
        //     ) as TreeItems<TemplateSection>,
        // );
    }, [sections, currentSection]);

    return (
        <div className={cn.sections}>
            <Input value={query} onChange={searchHandler} />

            <SortableTree
                items={filterBy(treeData, query)}
                onItemsChanged={sortSectionHandler}
                TreeItemComponent={StructureSection}
                disableSorting={!!query || isBlank || (isCase && !isDraft)}
            />
        </div>
    );
};

export default StructureSectionsDnD;
