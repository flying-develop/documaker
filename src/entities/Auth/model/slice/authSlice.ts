/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { checkLogin } from '../services/checkLogin';
import { setPending } from './reducers/setPending';
import { setRejected } from './reducers/setRejected';
import { checkLoginFulfilled } from './reducers/checkLoginFulfilled';
import { login } from '../services/login';
import { loginFulfilled } from './reducers/loginFulfilled';
import { register } from '../services/register';
import { registerFulfilled } from './reducers/registerFulfilled';
import { reset } from '../services/reset';
import { resetFulfilled } from './reducers/resetFulfilled';
import { forgot } from '../services/forgot';
import { forgotFulfilled } from './reducers/forgotFulfilled';
import { AuthSchema } from '../types/AuthSchema';
import { setLoginRejected } from './reducers/setLoginRejected';

const initialState: AuthSchema = {
    error: null,
    errorCode: null,
    loading: false,
    id: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetIdUser: (state: AuthSchema) => {
            state.id = null;
        },
        clearError: (state: AuthSchema) => {
            state.error = null;
            state.errorCode = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkLogin.pending, setPending)
            .addCase(checkLogin.rejected, setRejected)
            .addCase(checkLogin.fulfilled, checkLoginFulfilled)

            .addCase(login.pending, setPending)
            .addCase(login.rejected, setLoginRejected)
            .addCase(login.fulfilled, loginFulfilled)

            .addCase(register.pending, setPending)
            .addCase(register.rejected, setRejected)
            .addCase(register.fulfilled, registerFulfilled)

            .addCase(reset.pending, setPending)
            .addCase(reset.rejected, setRejected)
            .addCase(reset.fulfilled, resetFulfilled)

            .addCase(forgot.pending, setPending)
            .addCase(forgot.rejected, setRejected)
            .addCase(forgot.fulfilled, forgotFulfilled);
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
