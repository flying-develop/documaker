import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useState } from 'react';

export interface HeaderContextProps {
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
}

const initialContext: HeaderContextProps = {
    isShow: true,
    setIsShow: () => {},
};

export const HeaderContext = createContext<HeaderContextProps>(initialContext);

const HeaderProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isShow, setIsShow] = useState<boolean>(initialContext.isShow);

    const context: HeaderContextProps = {
        isShow,
        setIsShow,
    };

    return <HeaderContext.Provider value={context}>{children}</HeaderContext.Provider>;
};

export default HeaderProvider;
