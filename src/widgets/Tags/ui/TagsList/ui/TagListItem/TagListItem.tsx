import { FC, useMemo } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { HiDotsVertical } from 'react-icons/hi';
import { Tag } from '&/entities/Tag/model/types/Tag';
import { DeleteTag, EditTag } from '&/features/Tag';
import Chip from '&/shared/ui/Chip/Chip';
import cn from './TagListItem.module.scss';

interface TagListItemProps {
    tag: Tag;
}

const TagListItem: FC<TagListItemProps> = (props) => {
    const { tag } = props;

    const items: MenuProps['items'] = useMemo(() => {
        return [
            {
                key: '1',
                label: <EditTag tag={tag} />,
            },
            {
                key: '2',
                label: <DeleteTag tag={tag} />,
            },
        ];
    }, [tag]);

    return (
        <Chip
            key={tag.id}
            title={`#${tag.name}`}
            tooltip={tag.title}
            badge={tag.type}
            copy={`#${tag.name}`}
            control={
                <Dropdown
                    className={cn.dropdown}
                    menu={{ items }}
                    placement="bottomLeft"
                    trigger={['click']}
                >
                    <span className={cn.menu}>
                        <HiDotsVertical />
                    </span>
                </Dropdown>
            }
        />
    );
};

export default TagListItem;
