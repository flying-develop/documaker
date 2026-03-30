import { useAuth } from '&/app/providers/auth/ui/AuthProvider';
import { HeaderContext, HeaderContextProps } from '&/app/providers/Header/HeaderProvider';
import { useProfile } from '&/entities/Profile/hooks/useProfile';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import Loading from '&/shared/ui/Loading/Loading';
import { useContext, useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
    const { setIsShow } = useContext<HeaderContextProps>(HeaderContext);

    useLayoutEffect(() => {
        setIsShow(true);
    }, [setIsShow]);

    const { isAuth } = useAuth();
    const { isAdmin, isSuperAdmin, isUser, isModerator } = useProfile();

    if (!isAuth) {
        return <Loading />;
    }

    if (isAdmin || isSuperAdmin || isModerator) {
        return <Navigate to={`/${AppRoutes.TEMPLATES}`} />;
    }

    if (isUser) {
        return <Navigate to={`/${AppRoutes.CASES}`} />;
    }

    return <Loading />;
};

export default HomePage;
