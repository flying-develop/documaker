import { useAuth } from '&/app/providers/auth/ui/AuthProvider';
import { useProfile } from '&/entities/Profile/hooks/useProfile';
import Loading from '&/shared/ui/Loading/Loading';
import Cases from '../Cases/Cases';
import ClientCases from '../ClientCases/ClientCases';

const CasesPage = () => {
    const { isAuth } = useAuth();
    const { isUser } = useProfile();

    if (isAuth) {
        return isUser ? <ClientCases /> : <Cases />;
    }

    return <Loading />;
};

export default CasesPage;
