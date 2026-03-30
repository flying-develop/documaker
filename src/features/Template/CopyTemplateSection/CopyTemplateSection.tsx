import { FC, useCallback } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';
import { useAppDispatch } from '&/app/providers/Store';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { duplicateTemplateSection } from '&/entities/Template/model/services/duplicateTemplateSection';
import cn from './CopyTemplateSection.module.scss';

interface Props {
    section: TemplateSection;
}

const CopyTemplateSection: FC<Props> = (props) => {
    const { section } = props;
    const dispatch = useAppDispatch();

    const copySection = useCallback(() => {
        dispatch(duplicateTemplateSection({ section }));
    }, [dispatch, section]);
    return (
        <div onClick={copySection} className={cn.row}>
            <AiOutlineCopy />
            <span>Copy section</span>
        </div>
    );
};

export default CopyTemplateSection;
