import { useState } from 'react';

import { getAvatarInitials } from '&/shared/utils/getAvatarInitials';
import { Avatar } from 'antd';
import { useProfile } from '&/entities/Profile/hooks/useProfile';
import cn from './HeaderProfile.module.scss';
import ProfileModal from '../ProfileModal/ProfileModal';

const HeaderProfile = () => {
    const { profile } = useProfile();

    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);

    const handleClickProfile = () => {
        setIsShowPopup(true);
    };

    const handleOnClose = () => {
        setIsShowPopup(false);
    };

    return (
        <>
            <div className={cn.profile} onClick={handleClickProfile}>
                <div className={cn['profile-name']}>{profile?.name}</div>
                <div className={cn['profile-icon']}>
                    {profile && !profile?.avatar && (
                        <Avatar className={cn['profile-avatar-text']}>
                            {getAvatarInitials(profile?.name)}
                        </Avatar>
                    )}
                    {profile && profile?.avatar && (
                        <Avatar className={cn['profile-avatar-image']} src={profile?.avatar.url} />
                    )}
                </div>
            </div>

            <ProfileModal isOpen={isShowPopup} onClose={handleOnClose} />
        </>
    );
};

export default HeaderProfile;
