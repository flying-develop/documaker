/* eslint-disable react-refresh/only-export-components */
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
import { TabKeys, tabItems } from './tabConfig';

interface LoginContextProps {
    login: null | string;
    typeLogin: string;
    setLogin: (login: string) => void;
    setTypeLogin: (type: string) => void;
}

const LoginContext = createContext<LoginContextProps>({} as LoginContextProps);
export const useLogin = () => useContext(LoginContext);

const LoginProvider: FC<PropsWithChildren> = ({ children }) => {
    const defaultActive = tabItems?.find(({ value }) => value === TabKeys.EMAIL)?.value || TabKeys.EMAIL;

    const [login, setLogin] = useState<string | null>(null);
    const [typeLogin, setTypeLogin] = useState<string>(defaultActive);

    const context = {
        login,
        setLogin,
        typeLogin,
        setTypeLogin,
    };

    return <LoginContext.Provider value={context}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
