/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { Input, Button, Segmented } from 'antd';
import { IMaskInput } from 'react-imask';
import PhoneInput from '&/shared/ui/PhoneInput/PhoneInput';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ILogin } from '&/entities/Auth/model/types/userData';
import { useAuth } from '&/app/providers/auth/ui/AuthProvider';
import { useAppSelector } from '&/app/providers/Store';
import { useAppDispatch } from '&/app/providers/Store';
import { getIdUser } from '&/entities/Auth/model/selectors/getIdUser';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { useNavigate, Link } from 'react-router-dom';
import { getErrorCode } from '&/entities/Auth/model/selectors/getErrorCode';
import { authActions } from '&/entities/Auth/model/slice/authSlice';
import { FORM_ERROR, FormErrors } from '../../types/FormErrors';
import { TabKeys, tabItems } from '../../config/tabConfig';
import withAuth from '../../utils/withAuth/withAuth';
import { useLogin } from '../../config/LoginProvider';

import './LoginForm.scss';

const LoginForm = () => {
    const idUser = useAppSelector(getIdUser);
    const errorCode = useAppSelector(getErrorCode);
    const dispatch = useAppDispatch();
    const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
    const { typeLogin, setTypeLogin, setLogin } = useLogin();
    const { isAuth, checkLogin, login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState, control, setError, clearErrors, watch, setValue, setFocus } =
        useForm<ILogin & FormErrors>({});
    const { errors: formErrors } = formState;
    const {
        name: loginInputName,
        ref: loginInputRef,
        onChange: onLoginInputChange,
        onBlur: onLoginInputBlur,
    } = register('login', {
        required: 'Cannot be empty',
        validate: (value) => {
            if (typeLogin === TabKeys.EMAIL) {
                return (
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
                        value as string,
                    ) || 'This is not an E-mail'
                );
            }

            return true;
        },
    });
    const { name: passwordInputName } = register('password');

    const onChangeTab = (tabName: string) => {
        setTypeLogin(tabName);
        setLogin('');
        setValue('login', '');
        setShowPasswordField(false);
        dispatch(authActions.resetIdUser());
    };

    const onSubmit = (payload: ILogin) => {
        if (!showPasswordField && payload.login) {
            setLogin(payload.login);
            checkLogin({ login: payload.login });
        }

        if (showPasswordField && idUser && payload.login && payload.password) {
            login({ id: idUser, login: payload.login, password: payload.password });
        }
    };

    useEffect(() => {
        setShowPasswordField(idUser !== null);
        if (isAuth) navigate(`/${AppRoutes.TEMPLATES}`);
        if (errorCode === 422) navigate(`/${AppRoutes.AUTH}/${AppRoutes.REGISTER}`);
        if (errorCode === 401) {
            setError(FORM_ERROR, { message: 'Hmm. Wrong password. Please retry or reset it.' ?? '' });
            setShowPasswordField(false);
            setValue('login', '');
            setValue('password', '');
            setFocus('login');
        }
        if (showPasswordField) {
            setFocus('password');
        }
    }, [errorCode, idUser, isAuth, navigate, setError, setFocus, setValue, showPasswordField]);

    useEffect(() => {
        const subscription = watch((_value, { type }) => {
            if ((type as string) === 'input' || type === 'change' || type === 'valueChange')
                clearErrors(FORM_ERROR);
        });

        return () => subscription.unsubscribe();
    }, [clearErrors, idUser, watch]);

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Segmented
                size="large"
                className="login-segmented"
                options={tabItems}
                onChange={onChangeTab}
            />

            {typeLogin === TabKeys.EMAIL && (
                <div className="login-input">
                    <Controller
                        control={control}
                        name={loginInputName}
                        render={({field}) => (
                            <IMaskInput
                                inputRef={loginInputRef}
                                name={loginInputName}
                                mask={[{ mask: /^\S*@?\S*$/ }]}
                                type="email"
                                inputMode="email"
                                readOnly={showPasswordField}
                                className="form-input-field"
                                placeholder="E-mail"
                                onAccept={(_value, _mask, event: InputEvent | undefined) => {
                                    if (event) onLoginInputChange(event);
                                }}
                                onComplete={(_value, _mask, event: InputEvent | undefined) => {
                                    if (event) onLoginInputChange(event);
                                }}
                                onBlur={onLoginInputBlur}
                                value={field.value}
                            />
                        )}
                    />

                    <div className="login-input-error">
                        {formErrors.login && formErrors.login?.message}
                    </div>
                </div>
            )}
            {typeLogin === TabKeys.PHONE && (
                <div className="login-input">
                    <Controller
                        control={control}
                        name={loginInputName}
                        render={({field}) => (
                            <PhoneInput
                                inputRef={loginInputRef}
                                readOnly={showPasswordField}
                                name={loginInputName}
                                onChange={onLoginInputChange}
                                onBlur={onLoginInputBlur}
                                value={field.value}
                            />
                        )}
                    />
                </div>
            )}

            {showPasswordField && (
                <Controller
                    control={control}
                    name={passwordInputName}
                    render={({ field }) => (
                        <Input.Password
                            className="login-input-password"
                            placeholder="Password"
                            {...field}
                        />
                    )}
                />
            )}

            {formErrors[FORM_ERROR] && (
                <div className="login-input-error">{formErrors[FORM_ERROR]?.message}</div>
            )}

            <Button
                htmlType="submit"
                type="primary"
                disabled={formState.isSubmitting}
                className="login-input-submit"
                size="large"
            >
                {showPasswordField ? 'Sign in' : 'Continue'}
            </Button>

            <Link className="login-link" to={`/${AppRoutes.AUTH}/${AppRoutes.FORGOT}`}>
                Forgot password?
            </Link>
        </form>
    );
};

export default withAuth(LoginForm);
