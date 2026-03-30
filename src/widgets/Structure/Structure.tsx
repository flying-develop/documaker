import { FC } from 'react';
import { Typography } from 'antd';
import { useAppSelector } from '&/app/providers/Store';
import { getTemplateIsBlank } from '&/entities/Template/model/selectors/getTemplateIsBlank';
import { getTemplateIsCase } from '&/entities/Template/model/selectors/getTemplateIsCase';
import { AddTemplateSection } from '&/features/Template';
import StructureSectionsDnD from '&/widgets/Structure/ui/StructureSectionsDnD/StructureSectionsDnD';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import StructureSectionsCase from './ui/StructureSectionsCase/StructureSectionsCase';
import cn from './Structure.module.scss';

const Structure: FC = () => {
    const isBlank = useAppSelector(getTemplateIsBlank);
    const isCase = useAppSelector(getTemplateIsCase);
    const template = useAppSelector(getTemplate);
    const isDraft = !!template?.is_draft;
    const showAddSectionButton = (!isBlank && !isCase) || (isDraft && !isBlank);

    // TODO: расширить условие !isCase
    return (
        <div className={cn.section}>
            <div className={cn.content}>
                <Typography.Title level={5}>Structure</Typography.Title>
                {isCase && !isDraft && <StructureSectionsCase />}
                {
                    (!isCase || isDraft) && <StructureSectionsDnD /> // временно
                }
            </div>
            {showAddSectionButton && <AddTemplateSection />}
        </div>
    );
};

export default Structure;
