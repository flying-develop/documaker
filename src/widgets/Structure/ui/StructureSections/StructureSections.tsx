import { ChangeEvent, FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { Input, Skeleton } from 'antd';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import StructureSection from '&/widgets/Structure/ui/StructureSections/ui/StructureSection/StructureSection';
import { useAppSelector } from '&/app/providers/Store';
import { getTemplateSections } from '&/entities/Template/model/selectors/getTemplateSections';
import { getTemplateLoading } from '&/entities/Template/model/selectors/getTemplateLoading';
import { getTemplateIsBlank } from '&/entities/Template/model/selectors/getTemplateIsBlank';
import { getTemplateIsCase } from '&/entities/Template/model/selectors/getTemplateIsCase';
import cn from './StructureSections.module.scss';

const getSectionsList = (section: TemplateSection, isCase = false): ReactNode => {
    if (!!section.children?.length) {
        return [
            <StructureSection key={section.id} section={section} />,
            ...section.children
                .filter((section) => (isCase ? !!section.tags?.length : true))
                .map((section) => {
                    if (!!section.children?.length) {
                        return getSectionsList(section, isCase);
                    }
                    return <StructureSection key={section.id} section={section} />;
                }),
        ];
    }
    return <StructureSection key={section.id} section={section} />;
};

const filterBy = (arr: TemplateSection[], query: string): TemplateSection[] => {
    return query
        ? arr.reduce((acc: TemplateSection[], item) => {
              if (item.children?.length) {
                  const filtered = filterBy(item.children, query);
                  if (filtered.length) return [...acc, { ...item, children: filtered }];
              }

              const { children, ...itemWithoutChildren } = item;
              return item.title?.toLowerCase().includes(query.toLowerCase())
                  ? [...acc, itemWithoutChildren]
                  : acc;
          }, [])
        : arr;
};

const StructureSections: FC = () => {
    const templateSections = useAppSelector(getTemplateSections);
    const loading = useAppSelector(getTemplateLoading);
    const isBlank = useAppSelector(getTemplateIsBlank);
    const isCase = useAppSelector(getTemplateIsCase);
    const [query, setQuery] = useState('');

    const searchHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;
        setQuery(value);
    }, []);

    const sections = useMemo(() => {
        switch (true) {
            case isCase:
                return templateSections?.filter((section) =>
                    isCase ? !!section.tags?.length : true,
                );
            case isBlank:
                return templateSections;
            default:
                return templateSections?.filter((section) => !section?.is_global);
        }
    }, [isCase, isBlank, templateSections]);

    return (
        <div className={cn.sections}>
            <Input value={query} onChange={searchHandler} />
            {loading &&
                !sections?.length &&
                Array(12)
                    .fill(null)
                    .map((_, idx) => <Skeleton.Input key={idx} active size="default" block />)}
            <div className={cn.sections}>
                {sections &&
                    filterBy(sections, query)?.map((section) => getSectionsList(section, isCase))}
            </div>
        </div>
    );
};

export default StructureSections;
