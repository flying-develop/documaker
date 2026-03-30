import { FC } from 'react';
import { Menu, MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTag } from '&/entities/Tag/model/selectors/getTag';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import { TagType, TagTypes } from '&/shared/types/TagTypes';
import cn from './AddTagType.module.scss';

const AddTagType: FC = () => {
    const dispatch = useAppDispatch();
    const tag = useAppSelector(getTag);

    const typeHandler: MenuProps['onClick'] = ({ key }) => {
        dispatch(tagsActions.updateTag({ type: key as TagType }));
    };

    return (
        <Menu
            className={cn.list}
            items={TagTypes.filter((tag) => tag.key !== TagType.FILE)}
            selectedKeys={[tag.type || '']}
            onSelect={typeHandler}
        />
    );
};

export default AddTagType;
