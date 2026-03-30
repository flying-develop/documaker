import { FC } from 'react';
import { Card, Typography } from 'antd';
import { TagScope } from '&/entities/Tag/model/types/Tag';
import TagsList from '&/widgets/Tags/ui/TagsList/TagsList';
import cn from './Tags.module.scss';

interface TagsProps {
    title: string;
    scope: TagScope;
}

const Tags: FC<TagsProps> = (props) => {
    const { title, scope = 'global' } = props;
    return (
        <Card styles={{ body: { padding: 0 } }}>
            <div className={cn.tags}>
                <Typography.Title level={5}>{title}</Typography.Title>
                <TagsList scope={scope} />
            </div>
        </Card>
    );
};

export default Tags;
