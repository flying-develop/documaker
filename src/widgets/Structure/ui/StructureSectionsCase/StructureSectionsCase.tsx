import { FC, useMemo } from 'react';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { useAppSelector } from '&/app/providers/Store';
import { getTemplateSections } from '&/entities/Template/model/selectors/getTemplateSections';
import { SortableTree, TreeItems } from 'dnd-kit-sortable-tree';
import StructureSection from '&/widgets/Structure/ui/StructureSectionsDnD/ui/StructureSection/StructureSection';
import { getTemplateExcludedSections } from '&/entities/Template/model/selectors/getTemplateExcludedSections';
import cn from './StructureSections.module.scss';

const filterBy = (
    arr: TreeItems<TemplateSection>,
    excludedSections: number[],
): TreeItems<TemplateSection> => {
    return !!excludedSections.length
        ? arr.reduce((acc: TreeItems<TemplateSection>, item) => {
              const value = item.id;
              if (!!item.children?.length && !excludedSections.includes(+value)) {
                  const filtered = filterBy(item.children, excludedSections);
                  if (!!filtered.length) return [...acc, { ...item, children: filtered }];
              }

              const { ...itemWithoutChildren } = item;
              return !excludedSections.includes(+value) ? [...acc, itemWithoutChildren] : acc;
          }, [])
        : arr;
};

const StructureSectionsCase: FC = () => {
    const templateSections = useAppSelector(getTemplateSections);
    const excludedSections = useAppSelector(getTemplateExcludedSections);

    const tree = useMemo(() => {
        const sections = templateSections?.filter(
            (section) => !!section.tags?.length,
        ) as TreeItems<TemplateSection>;
        if (sections) {
            return filterBy(sections, excludedSections);
        }
        return [];
    }, [excludedSections, templateSections]);

    return (
        <div className={cn.sections}>
            <SortableTree
                items={tree}
                onItemsChanged={() => {}}
                TreeItemComponent={StructureSection}
                disableSorting
            />
        </div>
    );
};

export default StructureSectionsCase;
