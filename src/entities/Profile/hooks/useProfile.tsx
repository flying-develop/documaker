import { useAppSelector } from '&/app/providers/Store';
import { useEffect, useState } from 'react';
import { isRoleByName } from '&/shared/utils';
import { Roles } from '&/shared/config/roles/roles';
import { getProfile } from '../model/selectors/getProfile';

export const useProfile = () => {
    const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isModerator, setIsModerator] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const profile = useAppSelector(getProfile);

    useEffect(() => {
        if (profile && profile.roles) {
            setIsSuperAdmin(isRoleByName(profile.roles, Roles.SUPER_ADMIN));
            setIsAdmin(isRoleByName(profile.roles, Roles.ADMIN));
            setIsModerator(isRoleByName(profile.roles, Roles.MODERATOR));
            setIsUser(isRoleByName(profile.roles, Roles.USER));
        }
    }, [profile]);

    return {
        profile,
        isSuperAdmin,
        isAdmin,
        isModerator,
        isUser,
    };
};
