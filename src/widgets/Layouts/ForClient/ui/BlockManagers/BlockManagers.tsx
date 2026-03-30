import { FC } from 'react';
import { useAppSelector } from '&/app/providers/Store';
import { getManagers } from '&/entities/Profile/model/selectors/getManagers';
import ManagerCard from '../ManagerCard/ManagerCard';

import cn from './BlockManagers.module.scss';

const BlockManagers: FC = () => {
    const managers = useAppSelector(getManagers);

    return (
        managers && (
            <div className={cn['block-managers']}>
                <div className={cn['block-managers-title']}>Account managers</div>
                <div className={cn['block-managers-content']}>
                    <ul className={cn['block-managers-list']}>
                        {managers.map((user) => (
                            <li key={user.id} className={cn['block-managers-item']}>
                                <ManagerCard user={user} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    );
};

export default BlockManagers;
