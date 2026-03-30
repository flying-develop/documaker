import { FC, useCallback } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useAppDispatch } from '&/app/providers/Store';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { deleteTemplateSectionUnit } from '&/entities/Template/model/services/deleteTemplateSectionUnit';
import cn from './DeleteTemplateSectionUnit.module.scss';

interface Props {
    unit: TemplateUnit;
}

const DeleteTemplateSectionUnit: FC<Props> = ({ unit }) => {
    const dispatch = useAppDispatch();
    const removeUnitHandler = useCallback(async () => {
        if (unit) {
            dispatch(deleteTemplateSectionUnit(unit));
        }
    }, [dispatch, unit]);
    return (
        <div onClick={removeUnitHandler} className={cn.row}>
            <AiFillDelete />
            <span>Delete</span>
        </div>
    );
};

export default DeleteTemplateSectionUnit;
