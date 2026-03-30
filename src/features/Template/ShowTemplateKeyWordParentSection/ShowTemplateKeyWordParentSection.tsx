import { FC, PropsWithChildren, useCallback } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { updateTemplateSectionByIdSilence } from '&/entities/Template/model/services/updateTemplateSectionByIdSilence';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import cn from './ShowTemplateKeyWordParentSection.module.scss';

interface Props {
    section: TemplateSection;
}

const ShowTemplateKeyWordParentSection: FC<PropsWithChildren<Props>> = (props) => {
    const { section } = props;
    const dispatch = useAppDispatch();
    const editedSection = useAppSelector(getTemplateEditedSection);

    const setActiveSection = useCallback(() => {
        if (section.main_parent) {
            dispatch(
                updateTemplateSectionByIdSilence({
                    section: { ...section.main_parent, is_current: 1 },
                }),
            );
        }
    }, [dispatch, section]);

    const setCurrentSectionHandler = useCallback(async () => {
        // dispatch(
        //     updateTemplateSectionByIdSilence({
        //         section: editedSection,
        //         callback: setActiveSection,
        //     }),
        // );
    }, [dispatch, editedSection, setActiveSection]);

    return (
        <div className={cn.row} onClick={setCurrentSectionHandler}>
            <AiOutlineEye />
            <span>Show parent section</span>'
        </div>
    );
};

export default ShowTemplateKeyWordParentSection;
