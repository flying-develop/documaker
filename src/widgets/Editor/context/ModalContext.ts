import { createContext } from 'react';

export type ModalContextType = {
    data: any;
    changeData: (data: any) => void;
};

const initialContext: ModalContextType = {
    data: {},
    changeData: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialContext);
