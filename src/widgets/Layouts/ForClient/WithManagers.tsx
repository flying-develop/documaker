import { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '&/app/providers/Store';
import { fetchManagers } from '&/entities/Profile/model/services/fetchManagers';
import BlockManagers from './ui/BlockManagers/BlockManagers';

import cn from './WithManagers.module.scss';

const WithManagers: FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchManagers({}));
    }, [dispatch]);

    return (
        <div className={cn.container}>
            <div className={cn.content}>{children}</div>
            <div className={cn.sidebar}>
                <BlockManagers />
            </div>
        </div>
    );
};

export default WithManagers;
