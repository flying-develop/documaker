import { FC } from 'react';
import { TbError404 } from 'react-icons/tb';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '&/shared/config/route/AppRoutes';

import cn from './NotFoundPage.module.scss';

const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={cn['not-found']}>
            <TbError404 size="120px" />
            <div className={cn['not-found-text']}>Page not found</div>
            <Button
                type="primary"
                size="large"
                className={cn['not-found-button']}
                onClick={() => {
                    navigate(AppRoutes.HOME);
                }}
            >
                Go back
            </Button>
        </div>
    );
};

export default NotFoundPage;
