import { Navigate, useLocation } from 'react-router';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { isRoleByName } from '&/shared/utils';
import { useProfile } from '&/entities/Profile/hooks/useProfile';
import { useAuth } from '../../auth/ui/AuthProvider';

interface ProtectedRouteProps {
    roles: string[];
}

const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({ children, roles = [] }) => {
    const location = useLocation();
    const [hasAccess, setHasAccess] = useState<boolean>(!!roles);
    const { isAuth } = useAuth();
    const { profile } = useProfile();

    useEffect(() => {
        if (isAuth && profile && profile.roles) {
            setHasAccess(isRoleByName(profile.roles, roles));
        }
    }, [profile, isAuth, roles]);

    if (isAuth) {
        if (hasAccess) {
            return children;
        }

        return <Navigate to={AppRoutes.HOME} state={{ from: location }} />;
    }

    return <Navigate to={`/${AppRoutes.AUTH}/${AppRoutes.LOGIN}`} state={{ from: location }} />;
};

export default ProtectedRoute;
