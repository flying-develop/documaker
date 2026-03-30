/* eslint-disable react-refresh/only-export-components */
import { Button, Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '&/app/providers/auth/ui/AuthProvider';
import { useAppSelector } from '&/app/providers/Store';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getErrorCode } from '&/entities/Auth/model/selectors/getErrorCode';
import { getError } from '&/entities/Auth/model/selectors/getError';
import { IReset } from '&/entities/Auth/model/types/userData';
import withAuth from '../../utils/withAuth/withAuth';

import './ResetForm.scss';
import { FORM_ERROR, FormErrors } from '../../types/FormErrors';

const ResetForm = () => {
    const errorCode = useAppSelector(getErrorCode);
    const errorMessage = useAppSelector(getError);
    const { isAuth, reset } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token') ?? undefined;
    const email = searchParams.get('email') ?? undefined;

    const { register, handleSubmit, formState, control, watch, setError, clearErrors } = useForm<IReset & FormErrors>({});
    const {errors: formErrors} = formState;

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

    const onSubmit = (payload: IReset) => {
        reset(payload);
    };

    useEffect(() => {
        if (isAuth) navigate(`/${AppRoutes.AUTH}/${AppRoutes.LOGIN}`);
        if (errorCode) {
            setError(FORM_ERROR, { message: errorMessage ?? '' });
        }
    }, [isAuth, errorCode, navigate, setError, errorMessage]);

    useEffect(() => {
        const subscription = watch((_value, { type }) => {
            if ((type as string) === 'input' || type === 'change' || type === 'valueChange')
                clearErrors(FORM_ERROR);
        });

        return () => subscription.unsubscribe();
    }, [clearErrors, watch]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="reset-form" noValidate>
            <input type="hidden" {...register('email', { value: email })} />
            <input type="hidden" {...register('token', { value: token })} />

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
                <div className="reset-input-error">{formErrors?.password?.message}</div>
            )}

            <Controller
                control={control}
                name={confirmPasswordInputName}
                render={({ field }) => (
                    <Input.Password
                        placeholder="Password"
                        className="register-input-password"
                        {...field}
                    />
                )}
            />

            {formErrors?.confirmPassword && (
                <div className="reset-input-error">{formErrors?.confirmPassword?.message}</div>
            )}

            {formErrors[FORM_ERROR] && (
                <div className="reset-input-error">{formErrors[FORM_ERROR]?.message}</div>
            )}

            <Button
                size="large"
                className="reset-input-submit"
                htmlType="submit"
                type="primary"
                disabled={formState.isSubmitting}
            >
                Continue
            </Button>
        </form>
    );
};

export default withAuth(ResetForm);
