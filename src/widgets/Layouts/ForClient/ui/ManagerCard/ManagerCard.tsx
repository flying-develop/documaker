import { FC } from 'react';
import { Avatar } from 'antd';
import { getAvatarInitials } from '&/shared/utils/getAvatarInitials';
import { Link } from 'react-router-dom';
import { User } from '&/entities/User/model/types/User';

import cn from './ManagerCard.module.scss';

interface ManagerCardProps {
    user: User;
}

const ManagerCard: FC<ManagerCardProps> = ({ user }) => {
    return (
        <div className={cn.card}>
            <div className={cn['card-icon']}>
                {user && !user?.avatar && (
                    <Avatar className={cn['card-icon-text']}>
                        {getAvatarInitials(user?.name)}
                    </Avatar>
                )}
                {user && user?.avatar && (
                    <Avatar className={cn['card-icon-image']} rootClassName={cn['card-icon-image']} src={user?.avatar.url} />
                )}
            </div>
            <div className={cn['card-info']}>
                <div className={cn['card-name']}>{user.name}</div>
                <div className={cn['card-phone']}>
                    <Link to={`tel:${user.phone}`}>{user.phone}</Link>
                </div>
                <div className={cn['card-email']}>
                    <Link to={`mailto:${user.email}`}>{user.email}</Link>
                </div>
            </div>
        </div>
    );
};

export default ManagerCard;
