import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { FORM_ERROR, FormErrors } from '&/features/Auth/ByLogin/types/FormErrors';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from 'antd';
import PhoneInput from '&/shared/ui/PhoneInput/PhoneInput';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import { addUser } from '&/entities/User/model/services/addUser';
import { getError } from '&/entities/User/model/selectors/getError';
import { User } from '&/entities/User/model/types/User';

import cn from './CreateUser.module.scss';

interface CreateUserProps {
    className?: string | undefined;
    successCreate: (user: User) => void
}

const CreateUser: FC<CreateUserProps> = ({ className, successCreate }) => {
    const dispatch = useAppDispatch();
    const {
        register,
        control,
        handleSubmit: onSubmit,
        formState,
        setError,
        watch,
        clearErrors,
    } = useForm<User & FormErrors>({});
    const { errors: formErrors } = formState;
    const serverError = useAppSelector(getError);

    const {
        name: phoneInputName,
        ref: phoneInputRef,
        onChange: onPhoneInputChange,
        onBlur: onPhoneInputBlur,
    } = register('phone', {
        required: 'Cannot be empty',
    });

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

    const { name: nameInputName } = register('name', {
        required: 'Cannot be empty',
    });

    useEffect(() => {
        if (serverError) {
            setError(FORM_ERROR, { message: serverError?.message ?? '' });
        }
    }, [serverError, setError]);

    useEffect(() => {
        const subscription = watch((_value, { type }) => {
            if ((type as string) === 'input' || type === 'change' || type === 'valueChange')
                clearErrors(FORM_ERROR);
        });

        return () => subscription.unsubscribe();
    }, [clearErrors, watch]);

    const handleSubmit = async (payloadForm: User) => {
        const { payload } = await dispatch(
            addUser({
                name: payloadForm.name,
                phone: payloadForm.phone,
                email: payloadForm.email,
                roles: 4
            }),
        );

        if (!serverError) {
            successCreate(payload.user)
        }
    };


    return (
        <form
            className={classNames(className, cn['create-user'])}
            onSubmit={onSubmit(handleSubmit)}
        >
            <div className={cn['create-user-field']}>
                <Controller
                    control={control}
                    name={phoneInputName}
                    render={() => (
                        <PhoneInput
                            value=""
                            readOnly={false}
                            inputRef={phoneInputRef}
                            name={phoneInputName}
                            onChange={onPhoneInputChange}
                            onBlur={onPhoneInputBlur}
                        />
                    )}
                />

                {formErrors?.phone && (
                    <div className="register-input-error">{formErrors?.phone?.message}</div>
                )}
            </div>

            <div className={cn['create-user-field']}>
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

            <div className={cn['create-user-field']}>
                <Controller
                    control={control}
                    name={nameInputName}
                    render={({ field }) => <Input placeholder="Full Name" {...field} />}
                />

                {formErrors?.name && (
                    <div className="register-input-error">{formErrors?.name?.message}</div>
                )}
            </div>

            {formErrors[FORM_ERROR] && (
                <div className="register-input-error">{formErrors[FORM_ERROR]?.message}</div>
            )}

            <Button
                type="primary"
                htmlType="submit"
                size="large"
                className={cn['create-user-submit']}
            >
                Save
            </Button>
        </form>
    );
};

export default CreateUser;
