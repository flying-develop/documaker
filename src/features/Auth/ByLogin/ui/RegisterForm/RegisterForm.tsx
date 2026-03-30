/* eslint-disable react-refresh/only-export-components */
import { Input, Button } from 'antd';
import { IMaskInput } from 'react-imask';
import PhoneInput from '&/shared/ui/PhoneInput/PhoneInput';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '&/app/providers/auth/ui/AuthProvider';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorCode } from '&/entities/Auth/model/selectors/getErrorCode';
import { IRegister } from '&/entities/Auth/model/types/userData';
import { getError } from '&/entities/Auth/model/selectors/getError';
import { authActions } from '&/entities/Auth/model/slice/authSlice';
import { FORM_ERROR, FormErrors } from '../../types/FormErrors';
import withAuth from '../../utils/withAuth/withAuth';

import './RegisterForm.scss';

const RegisterForm = () => {
    const errorCode = useAppSelector(getErrorCode);
    const errorMessage = useAppSelector(getError);
    const dispatch = useAppDispatch();
    const { isAuth, register: registration } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState, control, watch, setError, clearErrors } = useForm<
        IRegister & FormErrors
    >({});
    const { errors: formErrors } = formState;

    const {
        name: emailInputName,
        ref: emailInputRef,
        onChange: onEmailInputChange,
        onBlur: onEmailInputBlur,
    } = register('email', {
        required: 'Cannot be empty',
        validate: (value: string) => {
            return (
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
                    value,
                ) || 'This is not an E-mail'
            );
        },
    });

    const {
        name: phoneInputName,
        ref: phoneInputRef,
        onChange: onPhoneInputChange,
        onBlur: onPhoneInputBlur,
    } = register('phone', {
        required: 'Cannot be empty',
    });
    const { name: nameInputName } = register('name', {
        required: 'Cannot be empty',
    });
    const { name: passwordInputName } = register('password', {
        required: 'Cannot be empty',
    });
    const { name: confirmPasswordInputName } = register('confirmPassword', {
        required: 'Cannot be empty',
        validate: (value: string) => {
            if (watch('password') !== value) {
                return 'Passwords do no match';
            }
        },
    });

    const onSubmit = (payload: IRegister) => {
        registration(payload);
    };

    useEffect(() => {
        if (isAuth) navigate(`/${AppRoutes.TEMPLATES}`);
        if (errorCode) {
            setError(FORM_ERROR, { message: errorMessage ?? '' });
        }
    }, [isAuth, errorCode, navigate, errorMessage, setError]);

    useEffect(() => {
        const subscription = watch((_value, { type }) => {
            if ((type as string) === 'input' || type === 'change' || type === 'valueChange')
                clearErrors(FORM_ERROR);
        });

        return () => subscription.unsubscribe();
    }, [clearErrors, watch]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="register-form" noValidate>
            <div className="register-input">
                <Controller
                    control={control}
                    name={phoneInputName}
                    render={() => (
                        <PhoneInput
                            readOnly={false}
                            inputRef={phoneInputRef}
                            name={phoneInputName}
                            onChange={onPhoneInputChange}
                            onBlur={onPhoneInputBlur}
                            value=""
                        />
                    )}
                />
                {formErrors?.phone && (
                    <div className="register-input-error">{formErrors?.phone?.message}</div>
                )}
            </div>
            <div className="register-input">
                <Controller
                    control={control}
                    name={emailInputName}
                    render={() => (
                        <IMaskInput
                            inputRef={emailInputRef}
                            name={emailInputName}
                            mask={[{ mask: /^\S*@?\S*$/ }]}
                            type="email"
                            inputMode="email"
                            className="form-input-field"
                            placeholder="E-mail"
                            onAccept={(_value, _mask, event: InputEvent | undefined) => {
                                if (event) onEmailInputBlur(event);
                            }}
                            onComplete={(_value, _mask, event: InputEvent | undefined) => {
                                if (event) onEmailInputChange(event);
                            }}
                            onBlur={onEmailInputBlur}
                        />
                    )}
                />

                {formErrors?.email && (
                    <div className="register-input-error">{formErrors?.email?.message}</div>
                )}
            </div>
            <div className="register-input">
                <Controller
                    control={control}
                    name={nameInputName}
                    render={({ field }) => (
                        <Input placeholder="Full Name" className="form-input-field" {...field} />
                    )}
                />
                {formErrors?.password && (
                    <div className="register-input-error">{formErrors?.password?.message}</div>
                )}
            </div>

            <Controller
                control={control}
                name={passwordInputName}
                render={({ field }) => (
                    <Input.Password
                        placeholder="Password"
                        className="register-input-password"
                        {...field}
                    />
                )}
            />
            {formErrors?.password && (
                <div className="register-input-error">{formErrors?.password?.message}</div>
            )}

            <Controller
                control={control}
                name={confirmPasswordInputName}
                render={({ field }) => (
                    <Input.Password
                        placeholder="Confirm password"
                        className="register-input-password"
                        {...field}
                    />
                )}
            />
            {formErrors?.confirmPassword && (
                <div className="register-input-error">{formErrors?.confirmPassword?.message}</div>
            )}

            {formErrors[FORM_ERROR] && (
                <div className="register-input-error">{formErrors[FORM_ERROR]?.message}</div>
            )}

            <Button
                size="large"
                className="register-input-submit"
                htmlType="submit"
                type="primary"
                disabled={formState.isSubmitting}
            >
                Continue
            </Button>

            <Button
                size="large"
                htmlType="button"
                className="register-input-back"
                onClick={() => {
                    dispatch(authActions.clearError());
                    navigate(AppRoutes.HOME, { replace: true });
                }}
            >
                Go back
            </Button>

            <div className="register-form-privacy">
                I have read and agree to Dockumaker’s <br />
                <Link to="/">User Agreement</Link> and <Link to="/">Privacy Policy</Link>
            </div>
        </form>
    );
};

export default withAuth(RegisterForm);
