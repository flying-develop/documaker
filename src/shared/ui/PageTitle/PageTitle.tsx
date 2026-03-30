import { FC } from 'react';
import { Button, Typography } from 'antd';
import ArrowLeft from '&/shared/assets/icons/ArrowLeft.svg?react';
import cn from './PageTitle.module.scss';

interface PageTitle {
    title?: string;
    onBack?: () => void;
}

const PageTitle: FC<PageTitle> = (props) => {
    const { title, onBack } = props;
    return (
        <div className={cn.container}>
            {onBack && (
                <Button onClick={onBack} className={cn.button} icon={<ArrowLeft />} />
            )}
            <Typography.Title level={4} className={cn.title}>
                {title}
            </Typography.Title>
        </div>
    );
};

export default PageTitle;
