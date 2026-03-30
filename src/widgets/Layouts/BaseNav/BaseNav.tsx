import { FC, PropsWithChildren } from 'react';
import Menu from '&/widgets/Layouts/BaseNav/ui/Menu/Menu';
import { Card } from 'antd';
import cn from './BaseNav.module.scss';

const BaseNav: FC<PropsWithChildren> = (props) => {
    const { children } = props;
    return (
        <Card styles={{ body: { padding: 0 } }} className={cn['base-nav']}>
            <div className={cn.container}>
                <Menu className={cn['base-nav-menu']} />
                <div className={cn['base-nav-content']}>{children}</div>
            </div>
        </Card>
    );
};

export default BaseNav;
