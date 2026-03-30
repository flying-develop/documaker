import { FC, useCallback } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { deleteTemplateSection } from '&/entities/Template/model/services/deleteTemplateSection';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import cn from './DeleteTemplateSection.module.scss';

interface AddTemplateSubSectionProps {
    section: TemplateSection;
}

const DeleteTemplateSection: FC<AddTemplateSubSectionProps> = ({ section }) => {
    const dispatch = useAppDispatch();
    const editedSection = useAppSelector(getTemplateEditedSection);
    const deleteSectionHandler = useCallback(() => {
        dispatch(
            deleteTemplateSection({ id: Number(section.id), node: Number(section.petition_id) }),
        );
        if (section.id === editedSection.id) {
            dispatch(templatesActions.resetTemplateEditedSection());
        }
    }, [dispatch, editedSection, section]);
    return (
        <div onClick={deleteSectionHandler} className={cn.row}>
            <AiFillDelete />
            <span>Delete</span>
        </div>
    );
};

export default DeleteTemplateSection;
