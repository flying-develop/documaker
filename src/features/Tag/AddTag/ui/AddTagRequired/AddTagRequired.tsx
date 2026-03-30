import { FC } from 'react';
import { Switch } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTag } from '&/entities/Tag/model/selectors/getTag';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import cn from './AddTagRequired.module.scss';

const AddTagRequired: FC = () => {
    const dispatch = useAppDispatch();
    const tag = useAppSelector(getTag);

    const requiredHandler = (required: boolean) => {
        dispatch(tagsActions.updateTag({ required }));
    };

    return (
        <label className={cn.required}>
            <span>Required</span>
            <Switch size="small" checked={!!tag?.required} onChange={requiredHandler} />
        </label>
    );
};

export default AddTagRequired;
