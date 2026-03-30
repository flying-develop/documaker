/* eslint-disable react-refresh/only-export-components */
import { checkLogin } from '&/entities/Auth/model/services/checkLogin';
import { forgot } from '&/entities/Auth/model/services/forgot';
import { login } from '&/entities/Auth/model/services/login';
import { register } from '&/entities/Auth/model/services/register';
import { reset } from '&/entities/Auth/model/services/reset';
import {
    ICheckLogin,
    IForgot,
    ILogin,
    IRegister,
    IReset,
} from '&/entities/Auth/model/types/userData';
import {
    FC,
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { profileActions } from '&/entities/Profile/model/slice/profileSlice';
import { fetchProfile } from '&/entities/Profile/model/services/fetchProfile';
import { getProfile } from '&/entities/Profile/model/selectors/getProfile';
import { getAccessToken } from '&/entities/Profile/model/selectors/getAccessToken';
import { Profile } from '&/entities/Profile/model/types/Profile';
import { getExpiresAt } from '&/entities/Profile/model/selectors/getExpiresAt';
import { refreshAccessToken } from '&/entities/Profile/model/services/refreshAccessToken';

interface AuthContextProps {
    isAuth: boolean;
    checkLogin: (data: ICheckLogin) => void;
    login: (data: ILogin) => void;
    register: (data: IRegister) => void;
    forgot: (data: IForgot) => void;
    reset: (data: IReset) => void;
    logout: () => void;
    profile: Profile | null;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(getAccessToken);
    const expiresAt = useAppSelector(getExpiresAt);
    const checkAuth = useCallback(
        () => Boolean(accessToken.length > 0 && expiresAt !== 0),
        [accessToken, expiresAt],
    );
    const profile = useAppSelector(getProfile);

    const [isAuth, setIsAuth] = useState<boolean>(checkAuth());
    const [timeRefreshToken, setTimeRefreshToken] = useState<boolean>(false);

    const checkLoginHandler = (data: ICheckLogin) => {
        dispatch(checkLogin({ ...data }));
    };

    const loginHandler = async (data: ILogin) => {
        if (data.id) {
            const { payload }: any = await dispatch(login({ ...data }));

            dispatch(profileActions.setAccessToken({ accessToken: payload.access_token }));
            dispatch(profileActions.setExpiresAt({ expiresIn: payload.expires_in }));
        }
    };

    const registerHandler = async (data: IRegister) => {
        const { payload }: any = await dispatch(register({ ...data }));

        dispatch(profileActions.setAccessToken({ accessToken: payload.access_token }));
        dispatch(profileActions.setExpiresAt({ expiresIn: payload.expires_in }));
    };

    const resetHandler = async (data: IReset) => {
        const { payload }: any = await dispatch(reset({ ...data }));

        dispatch(profileActions.setAccessToken({ accessToken: payload.access_token }));
        dispatch(profileActions.setExpiresAt({ expiresIn: payload.expires_in }));
    };

    const forgotHandler = (data: IForgot) => {
        dispatch(forgot({ ...data }));
    };

    const logoutHandler = () => {
        dispatch(profileActions.setAccessToken({ accessToken: '' }));
        dispatch(profileActions.setExpiresAt({ expiresIn: 0 }));
        setIsAuth(false);
    };

    useEffect(() => {
        setIsAuth(checkAuth());
    }, [accessToken, checkAuth, expiresAt]);

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchProfile({}));
        }
    }, [dispatch, isAuth]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRefreshToken(Number(expiresAt) > 0 && Date.now() >= Number(expiresAt) - 600000);
        }, 300);

        return () => {
            clearInterval(interval);
        };
    }, [expiresAt]);

    useEffect(() => {
        if (timeRefreshToken && isAuth) {
            dispatch(refreshAccessToken({}));
            setTimeRefreshToken(false);
        }
    }, [dispatch, isAuth, timeRefreshToken]);


    const context = {
        profile,
        isAuth,
        checkLogin: checkLoginHandler,
        login: loginHandler,
        register: registerHandler,
        forgot: forgotHandler,
        reset: resetHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
