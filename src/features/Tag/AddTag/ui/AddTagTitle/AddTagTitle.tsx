import { ChangeEvent, FC } from 'react';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTag } from '&/entities/Tag/model/selectors/getTag';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import { getTagName } from '&/shared/utils';
import cn from './AddTagTitle.module.scss';

const AddTagTitle: FC = () => {
    const dispatch = useAppDispatch();
    const tag = useAppSelector(getTag);

    const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        const title = evt.target.value;
        dispatch(tagsActions.updateTag({ title, name: getTagName(title) }));
    };

    return (
        <div>
            <div className={cn.header}>
                <div className={cn.name}>#{tag.name}</div>
            </div>
            <Input value={tag?.title} onChange={titleHandler} />
        </div>
    );
};

export default AddTagTitle;
