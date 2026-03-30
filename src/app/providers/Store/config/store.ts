import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import reducer, { RootState } from '&/app/providers/Store/config/reducer';
import { accessMiddleware } from '../middleware/accessMiddleware';

export const store = configureStore({
    reducer,
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(accessMiddleware),
});

export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: DispatchFunc = useDispatch;
