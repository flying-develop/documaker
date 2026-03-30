/* eslint-disable react-refresh/only-export-components */
import { Button, Modal } from 'antd';
import { IMaskInput } from 'react-imask';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '&/app/providers/auth/ui/AuthProvider';
import { useAppSelector } from '&/app/providers/Store';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { getErrorCode } from '&/entities/Auth/model/selectors/getErrorCode';
import { IForgot } from '&/entities/Auth/model/types/userData';
import { getError } from '&/entities/Auth/model/selectors/getError';
import withAuth from '../../utils/withAuth/withAuth';

import './ForgotForm.scss';
import { FORM_ERROR, FormErrors } from '../../types/FormErrors';

const ForgotForm = () => {
    const errorCode = useAppSelector(getErrorCode);
    const errorMessage = useAppSelector(getError);
    const { isAuth, forgot } = useAuth();
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const { register, handleSubmit, formState, control, clearErrors, watch, setError } = useForm<
        IForgot & FormErrors
    >({});
    const { errors: formErrors } = formState;

    const {
        name: emailInputName,
        ref: emailInputRef,
        onChange: onEmailInputChange,
        onBlur: onEmailInputBlur,
    } = register('email', {
        required: 'Cannot be empty',
        validate: (value) => {
            return (
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
                    value as string,
                ) || 'This is not an E-mail'
            );
        },
    });

    const onSubmit = (payload: IForgot) => {
        forgot(payload);

        setIsOpenModal(!errorCode);
    };

    const handleOnClickAcceptModal = () => {
        setIsOpenModal(false);

        navigate(`/${AppRoutes.AUTH}/${AppRoutes.LOGIN}`);
    };

    useEffect(() => {
        if (isAuth) navigate(`/${AppRoutes.AUTH}/${AppRoutes.LOGIN}`);

        if (errorCode) {
            setError(FORM_ERROR, {
                message: errorMessage ?? 'An error has occurred refresh the page and try again',
            });
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
        <form className="forgot-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="forgot-input">
                <Controller
                    control={control}
                    name={emailInputName}
                    render={() => (
                        <IMaskInput
                            inputRef={emailInputRef}
                            name={emailInputName}
                            mask={[{ mask: /^\S*@?\S*$/ }]}
                            type="text"
                            inputMode="email"
                            className="form-input-field"
                            placeholder="E-mail"
                            onAccept={(_value, _mask, event: InputEvent | undefined) => {
                                if (event) onEmailInputChange(event);
                            }}
                            onComplete={(_value, _mask, event: InputEvent | undefined) => {
                                if (event) onEmailInputChange(event);
                            }}
                            onBlur={onEmailInputBlur}
                        />
                    )}
                />

                <div className="forgot-input-error">{formErrors?.email?.message}</div>
            </div>

            {formErrors[FORM_ERROR] && (
                <div className="forgot-input-error">{formErrors[FORM_ERROR]?.message}</div>
            )}

            <Button
                size="large"
                className="forgot-input-submit"
                htmlType="submit"
                type="primary"
                disabled={formState.isSubmitting}
            >
                Continue
            </Button>

            <Button
                size="large"
                className="forgot-back"
                type="default"
                onClick={() => navigate(`/${AppRoutes.AUTH}/${AppRoutes.LOGIN}`)}
            >
                Go back
            </Button>

            {isOpenModal && (
                <Modal
                    title="Password Recovery"
                    open={isOpenModal}
                    onOk={handleOnClickAcceptModal}
                    footer={[
                        <Button key="submit" type="primary" onClick={handleOnClickAcceptModal}>
                            Go back
                        </Button>,
                    ]}
                >
                    Your password recovery request has been successfully sent.
                    <br />
                    Please check your email for further instructions on changing your password.
                    <br />
                    <br />
                    <strong>Thank you for using our service!</strong>
                </Modal>
            )}
        </form>
    );
};

export default withAuth(ForgotForm);
